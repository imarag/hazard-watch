import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
import {
  getPostById,
  searchPosts,
} from '@/features/posts/services'
import { getErrorMessage } from '@/features/auth/utils'
import type { SearchResult } from '@/features/posts/types'

export function getPostQueryOptions(
  id?: string,
  onError?: (message: string) => void,
) {
  return queryOptions({
    queryKey: ['posts', id],
    enabled: !!id,
    queryFn: async () => {
      try {
        return await getPostById(id!)
      } catch (error: unknown) {
        if (onError) {
          onError(getErrorMessage(error))
        }
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function searchPostsQueryOptions(onError?: (message: string) => void) {
  return infiniteQueryOptions({
    queryKey: ['posts', 'search'],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      try {
        return await searchPosts({
          page: pageParam,
        })
      } catch (error: unknown) {
        if (onError) {
          onError(getErrorMessage(error))
        }
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
}
