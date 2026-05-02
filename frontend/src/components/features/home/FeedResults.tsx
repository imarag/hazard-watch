import { Box, Button } from '@mui/material'
import HomePostCard from '@/components/features/posts/HomePostCard'
import { useNotification } from '@/contexts/NotificationContext'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/auth'
import type { SearchResult } from '@/types/posts'

import { Fragment } from 'react'
import postsService from '@/services/posts'

export default function FeedResults() {
  const { createNotification, showNotification } = useNotification()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<SearchResult, Error, SearchResult, string | undefined>({
      queryKey: ['posts'],
      queryFn: async ({ pageParam }) =>
        postsService.searchPosts({
          cursor: pageParam,
          limit: 10,
        }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })

  // const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
  // useInfiniteQuery({
  //   queryKey: ['posts'],
  //   queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
  //     try {
  //       return await postsService.searchPosts({
  //         cursor: pageParam,
  //         limit: 10,
  //       })
  //     } catch (error: unknown) {
  //       const errorMessage = getErrorMessage(error)
  //       showNotification(
  //         createNotification(
  //           `Cannot fetch the posts: ${errorMessage}`,
  //           'error',
  //         ),
  //       )
  //       throw error
  //     }
  //   },
  //   initialPageParam: undefined,
  //   getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  // })

  if (!data) {
    return <Box>Loading posts…</Box>
  }

  return (
    <Box>
      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((post) => (
            <HomePostCard key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      <Box>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </Box>
    </Box>
  )
}
