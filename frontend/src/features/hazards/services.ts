import { plainAxios } from '@/lib/api'
import { HazardType } from '@/features/hazards/types'
import type { HazardResponseMap } from '@/features/hazards/types'
import type { FilterParamsDefaults } from '@/shared/types/config'

const baseUrl = '/hazards'

export const fetchHazard = async <T extends HazardType>(
  type: T,
  queryParams: FilterParamsDefaults['global'] & FilterParamsDefaults[T],
): Promise<HazardResponseMap[T]> => {
  const res = await plainAxios.get<HazardResponseMap[T]>(
    `${baseUrl}/${type}s`,
    { params: queryParams },
  )
  return res.data
}
