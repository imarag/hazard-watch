import GoToCreatePostAction from '../actions/GoToCreatePostAction'
import ActionBar from '@/components/actions/ActionBar'
import { useAuth } from '@/contexts/AuthContext'
import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import EmptyPostsMessage from '@/components/features/posts/EmptyPostsMessage'
import postsService from '@/services/posts'
import Loading from '@/components/ui/Loading'
import HomePostCard from '@/components/features/posts/HomePostCard'
import type { SearchResult } from '@/types/posts'

export default function Home() {
  const { isUserLoggedIn } = useAuth()
  const { createNotification, showNotification } = useNotification()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['posts', 'search'],
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        try {
          return await postsService.searchPosts({
            page: pageParam,
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
      initialPageParam: 1,
      getNextPageParam: (
        lastPage: SearchResult,
        _allPages: SearchResult[],
        lastPageParam: number,
      ) => (lastPage.hasMore ? lastPageParam + 1 : undefined),
    })

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  if (isLoading) return <Loading text='Loading posts' />

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  if (posts.length === 0) return <EmptyPostsMessage />

  return (
    <>
      {isUserLoggedIn && (
        <ActionBar>
          <GoToCreatePostAction />
        </ActionBar>
      )}
      {posts.map((post) => (
        <HomePostCard key={post.id} post={post} />
      ))}
      {hasNextPage && <Box ref={sentinelRef} sx={{ height: 1, padding: 1 }} />}
      {isFetchingNextPage && <Loading text='Loading more...' />}
    </>
  )
}
