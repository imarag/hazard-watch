import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
import {
  getAllPosts,
  getPostById,
  searchPosts,
} from '@/features/posts/services'
import { getErrorMessage } from '@/features/auth/utils'
import type { FilterParamsDefaults } from '@/shared/types/config'
import type { SearchResult } from '@/features/posts/types'

export function postQueryOptions(
  enabled: boolean,
  filterParamsDefaults: FilterParamsDefaults,
) {
  return queryOptions({
    queryKey: [
      'posts',
      filterParamsDefaults['posts'],
      filterParamsDefaults.global,
    ],
    queryFn: async () => {
      const rawParams = {
        ...filterParamsDefaults.global,
        ...filterParamsDefaults.posts,
      }
      const params = Object.fromEntries(
        Object.entries(rawParams).filter(
          ([_, v]) => v !== '' && v !== null && v !== undefined,
        ),
      )
      return await getAllPosts(params)
    },
    staleTime: 5 * 60 * 1000,
    enabled: enabled,
    placeholderData: (previousData) => previousData,
  })
}

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
