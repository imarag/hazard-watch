import { Box, Stack } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getErrorMessage } from '@/utils/auth'
import { useNotification } from '@/contexts/NotificationContext'
import HomePostCard from '@/components/features/posts/HomePostCard'
import EmptyPostsMessage from '@/components/features/posts/EmptyPostsMessage'
import postsService from '@/services/posts'
import Loading from '@/components/ui/Loading'

interface InfiniteScrollProps {
  searchParam?: string
  children: React.ReactNode
}

export default function InfiniteScroll({
  searchParam,
  children,
}: InfiniteScrollProps) {
  const { createNotification, showNotification } = useNotification()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: searchParam
        ? ['posts', 'search', searchParam]
        : ['posts', 'feed'],
      queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
        try {
          return await postsService.searchPosts({
            cursor: pageParam,
            limit: 3,
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

  const { ref, inView } = useInView({ rootMargin: '200px' })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) return <Loading text='Loading posts' />

  const posts = data?.pages.flatMap((page) => page.data) ?? []

  if (posts.length === 0) {
    return <EmptyPostsMessage searchParam={searchParam} />
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {children}
      {hasNextPage && <Box ref={ref} sx={{ height: 1, padding: 2 }} />}
      {isFetchingNextPage && <Loading text='Loading more...' />}
    </Box>
  )
}

// {posts.length === 0 ? (
//         <EmptyPostsMessage searchParam={searchParam} />
//       ) : (
//         <>
//           <Stack direction='column' spacing={2}>
//             {posts.map((post) => (
//               <HomePostCard key={post.id} post={post} />
//             ))}
//           </Stack>

//           {hasNextPage && <Box ref={ref} sx={{ padding: 2 }}></Box>}

//           {isFetchingNextPage && <Loading text='Loading more...' />}
//         </>
//       )}
