// import { queryOptions } from '@tanstack/react-query'
// import type { HazardType } from '@/features/layers/types'
// import { fetchHazard } from '@/features/layers/services'
// import type { FilterParamsConfig } from '@/shared/types/config'

// export function hazardQueryOptions<T extends HazardType>(
//   hazard: T,
//   enabledHazards: HazardType[],
//   filterParamsDefaults: FilterParamsConfig,
// ) {
//   return queryOptions({
//     queryKey: [
//       'hazards',
//       hazard,
//       filterParamsDefaults[hazard],
//       filterParamsDefaults.global,
//     ],
//     queryFn: () => {
//       const queryParams = createQueryParams(filterParamsDefaults[hazard], filterParamsDefaults.global, enabledHazards)
//       fetchHazard({...queryParams})
//     },
//     staleTime: 5 * 60 * 1000,
//     placeholderData: (previousData) => previousData,
//     enabled: enabledHazards.includes(hazard),
//   })
// }
