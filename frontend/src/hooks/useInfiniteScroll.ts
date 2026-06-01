import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseInViewActionParams {
  enabled?: boolean
  onVisible: () => void
  rootMargin?: string
}

export default function useInViewAction({
  enabled = true,
  onVisible,
  rootMargin = '200px',
}: UseInViewActionParams) {
  const { ref, inView } = useInView({ rootMargin })

  useEffect(() => {
    if (inView && enabled) {
      onVisible()
    }
  }, [inView, enabled, onVisible])

  return ref
}