import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import SearchPostCard from '@/components/features/posts/SearchPostCard'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import EmptyPostsMessage from '@/components/features/posts/EmptyPostsMessage'
import postsService from '@/services/posts'
import Loading from '@/components/ui/Loading'
import type { Post, SearchResult } from '@/types/posts'

function SearchPostsStatus({
  searchParam,
  posts,
}: {
  searchParam: string
  posts: Post[]
}) {
  return (
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
        {posts.length} report{posts.length > 1 && posts.length !== 0 && 's'}
      </Typography>
    </Box>
  )
}

export default function Search() {
  const { createNotification, showNotification } = useNotification()
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('q') ?? ''

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['posts', 'search', searchParam],
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        try {
          return await postsService.searchPosts({
            page: pageParam,
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

  if (posts.length === 0) return <EmptyPostsMessage searchParam={searchParam} />

  return (
    <>
      <SearchPostsStatus posts={posts} searchParam={searchParam} />
      {posts.map((post) => (
        <SearchPostCard key={post.id} post={post} />
      ))}
      {hasNextPage && <Box ref={sentinelRef} sx={{ height: 1, padding: 1 }} />}
      {isFetchingNextPage && <Loading text='Loading more...' />}
    </>
  )
}
