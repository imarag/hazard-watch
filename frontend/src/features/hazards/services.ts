import { plainAxios } from '@/lib/api'
import { HazardType } from '@/features/hazards/types'

const baseUrl = '/hazards'

export const fetchHazard = async (type: HazardType) => {
  const res = await plainAxios.get(`${baseUrl}/${type}s`)
  return res.data
}
