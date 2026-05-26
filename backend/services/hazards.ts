import axios from 'axios'
import type {
  USGSEarthquakeResponse,
  GVPVolcanoResponse,
  GVPEruptionResponse,
} from '../models/hazards.ts'
import type {
  EarthquakeParams,
  VolcanoParams,
  EruptionParams,
} from '../models/hazards.ts'
import { providers } from '../providers.ts'

export const getEarthquakes = async (
  params: EarthquakeParams,
): Promise<USGSEarthquakeResponse> => {
  const response = await axios.get<USGSEarthquakeResponse>(
    providers.usgs.earthquakes.baseUrl,
    { params: { ...providers.usgs.earthquakes.defaults, ...params } },
  )
  return response.data
}

export const getVolcanoes = async (
  params: VolcanoParams,
): Promise<GVPVolcanoResponse> => {
  const response = await axios.get<GVPVolcanoResponse>(
    providers.gvp.volcanoes.baseUrl,
    { params: { ...providers.gvp.volcanoes.defaults, ...params } },
  )
  return response.data
}

export const getEruptions = async (
  params: EruptionParams,
): Promise<GVPEruptionResponse> => {
  const { volcanoNumber, CQL_FILTER, ...rest } = params
  const filter =
    CQL_FILTER ??
    (volcanoNumber ? `Volcano_Number=${volcanoNumber}` : undefined)

  const response = await axios.get<GVPEruptionResponse>(
    providers.gvp.eruptions.baseUrl,
    {
      params: {
        ...providers.gvp.eruptions.defaults,
        ...rest,
        ...(filter && { CQL_FILTER: filter }),
      },
    },
  )
  return response.data
}
