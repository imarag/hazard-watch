import { plainAxios } from '@/lib/api'
import { HazardType } from '@/features/hazards/types'

const baseUrl = '/hazards'

export const fetchHazard = async (type: HazardType, queryParams: any) => {
  const res = await plainAxios.get(`${baseUrl}/${type}s`, {
    params: queryParams,
  })
  return res.data
}
