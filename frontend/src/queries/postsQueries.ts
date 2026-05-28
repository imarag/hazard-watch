import { queryOptions } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { getAllPosts, getPostById } from '@/services/posts'
import { getErrorMessage } from '@/utils/auth'

type PostQueryOptions = Omit<
  UseQueryOptions,
  'queryKey' | 'queryFn' | 'staleTime'
>

export function postOptions(
  id: string,
  onError?: (message: string) => void,
  options: PostQueryOptions = {},
) {
  return queryOptions({
    queryKey: ['posts', id],
    queryFn: async () => {
      try {
        return await getPostById(id)
      } catch (error: unknown) {
        if (onError) {
          onError(getErrorMessage(error))
        }
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export function postsOptions(
  onError?: (message: string) => void,
  options: PostQueryOptions = {},
) {
  return queryOptions({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await getAllPosts()
      } catch (error: unknown) {
        if (onError) {
          onError(getErrorMessage(error))
        }
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}
