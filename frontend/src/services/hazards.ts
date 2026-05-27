import { plainAxios } from './api'
import { HazardType } from '@/types/hazards'

const baseUrl = '/hazards'

export const fetchHazard = async (type: HazardType) => {
  const res = await plainAxios.get(`${baseUrl}/${type}`)
  return res.data
}
