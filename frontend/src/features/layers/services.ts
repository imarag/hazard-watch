import { api } from '@/lib/api'
import { createQueryParams } from './utils'
import type { LayersResponse } from './types'

const baseUrl = '/hazards'

export const fetchLayers = async (
  queryParams: ReturnType<typeof createQueryParams>,
): Promise<LayersResponse> => {
  const res = await api.get(baseUrl, {
    params: queryParams,
  })
  return res.data
}
