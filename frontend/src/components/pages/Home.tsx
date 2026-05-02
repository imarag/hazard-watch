import GoToCreatePostAction from '../actions/GoToCreatePostAction'
import ActionBar from '@/components/actions/ActionBar'
import { useAuth } from '@/contexts/AuthContext'
import { Box, Stack } from '@mui/material'
import { useSearchParams } from 'react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import EmptyPostsMessage from '@/components/features/posts/EmptyPostsMessage'
import postsService from '@/services/posts'
import Loading from '@/components/ui/Loading'
import HomePostCard from '@/components/features/posts/HomePostCard'

export default function Home() {
  const { isUserLoggedIn } = useAuth()
  const { createNotification, showNotification } = useNotification()
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('q') ?? ''

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['posts', 'search', searchParam],
      queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
        try {
          return await postsService.searchPosts({
            cursor: pageParam,
            limit: 10,
            q: searchParam,
          })
        } catch (error: unknown) {
          showNotification(
            createNotification(
              `Cannot fetch the posts: ${getErrorMessage(error)}`,
              'error',
            ),
          )
          throw error
        }
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  if (isLoading) return <Loading text='Loading posts' />

  const posts = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isUserLoggedIn && (
        <ActionBar>
          <GoToCreatePostAction />
        </ActionBar>
      )}
      {posts.length === 0 ? (
        <EmptyPostsMessage searchParam={searchParam} />
      ) : (
        <>
          <Stack spacing={1.5}>
            {posts.map((post) => (
              <HomePostCard key={post.id} post={post} />
            ))}
          </Stack>

          {hasNextPage && (
            <Box ref={sentinelRef} sx={{ height: 1, padding: 1 }} />
          )}
          {isFetchingNextPage && <Loading text='Loading more...' />}
        </>
      )}
    </Box>
  )
}
