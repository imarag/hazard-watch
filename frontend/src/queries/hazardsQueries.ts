import { queryOptions } from '@tanstack/react-query'
import type { HazardType } from '@/types/hazards'
import { fetchHazard } from '@/services/hazards'
import type { UseQueryOptions } from '@tanstack/react-query'
import { getErrorMessage } from '@/utils/auth'

type PostQueryOptions = Omit<
  UseQueryOptions,
  'queryKey' | 'queryFn' | 'staleTime'
>

export function hazardOptions(
  hazard: HazardType,
  onError: (message: string) => void,
  options: PostQueryOptions = {},
) {
  return queryOptions({
    queryKey: ['hazards', hazard],
    queryFn: async () => {
      try {
        return await fetchHazard(hazard)
      } catch (error: unknown) {
        onError(getErrorMessage(error))
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}
