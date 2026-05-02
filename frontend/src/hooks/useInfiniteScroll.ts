import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseInfiniteScrollParams {
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => unknown
  rootMargin?: string
}

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '200px',
}: UseInfiniteScrollParams) {
  const { ref, inView } = useInView({ rootMargin })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return ref
}
