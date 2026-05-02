import { Box, Stack, Typography } from '@mui/material'
import { useSearchParams } from 'react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import SearchPostCard from '@/components/features/posts/SearchPostCard'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import EmptyPostsMessage from '@/components/features/posts/EmptyPostsMessage'
import postsService from '@/services/posts'
import Loading from '@/components/ui/Loading'

export default function Search() {
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
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'text.disabled',
        }}
      >
        <Typography>
          Showing results for{' '}
          <Typography component='span' sx={{ fontWeight: 'bold' }}>
            {searchParam}
          </Typography>
        </Typography>
        <Typography component='span'>
          {posts.length} report{posts.length > 1 && 's'}
        </Typography>
      </Box>

      {posts.length === 0 ? (
        <EmptyPostsMessage searchParam={searchParam} />
      ) : (
        <>
          <Stack spacing={1.5}>
            {posts.map((post) => (
              <SearchPostCard key={post.id} post={post} />
            ))}
          </Stack>

          {hasNextPage && <Box ref={sentinelRef} sx={{ height: 1 }} />}
          {isFetchingNextPage && <Loading text='Loading more...' />}
        </>
      )}
    </Box>
  )
}
