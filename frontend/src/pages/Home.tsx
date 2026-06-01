import GoToCreatePostAction from '@/features/posts/components/GoToCreatePostAction'
import ActionBar from '@/components/ui/ActionBar'
import { Box } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useNotificationActions } from '@/shared/stores/notification'
import { useIsUserLoggedIn } from '@/features/auth/store'
import EmptyPostsMessage from '@/features/posts/components/EmptyPostsMessage'
import Loading from '@/components/ui/Loading'
import HomePostCard from '@/features/posts/components/HomePostCard'
import { searchPostsQueryOptions } from '@/features/posts/queries'

export default function Home() {
  const { showNotification, createNotification } = useNotificationActions()
  const isUserLoggedIn = useIsUserLoggedIn()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      searchPostsQueryOptions((errorMessage) => {
        showNotification(createNotification(errorMessage, 'error'))
      }),
    )

  const sentinelRef = useInfiniteScroll({
    enabled: hasNextPage && !isFetchingNextPage,
    onVisible: fetchNextPage,
  })

  if (isLoading) {
    return <Loading text='Loading posts' />
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  if (posts.length === 0) {
    return <EmptyPostsMessage />
  }

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
