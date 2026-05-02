import { useState, useEffect } from 'react'

export default function useDebounce<T>(
  value: T,
  debounceSeconds = 1,
): { debouncedValue: T } {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000 * debounceSeconds)

    return () => clearTimeout(timeout)
  }, [value, debounceSeconds])

  return { debouncedValue }
}
