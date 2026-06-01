import { queryOptions } from '@tanstack/react-query'
import type { HazardType } from '@/features/hazards/types'
import { fetchHazard } from '@/features/hazards/services'
import type { FilterParamsDefaults } from '@/shared/types/config'

export function hazardQueryOptions<T extends HazardType>(
  hazard: T,
  enabledHazards: HazardType[],
  filterParamsDefaults: FilterParamsDefaults,
) {
  return queryOptions({
    queryKey: [
      'hazards',
      hazard,
      filterParamsDefaults[hazard],
      filterParamsDefaults.global,
    ],
    queryFn: () =>
      fetchHazard(hazard, {
        ...filterParamsDefaults.global,
        ...filterParamsDefaults[hazard],
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: enabledHazards.includes(hazard),
  })
}
