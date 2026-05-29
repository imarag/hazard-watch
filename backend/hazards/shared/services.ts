import axios from 'axios'
import Papa from 'papaparse'
import { providers } from '../shared/static.ts'
import { mapEarthquake } from '../earthquakes/mapper.ts'
import { mapEruption } from '../eruptions/mapper.ts'
import { mapWildfire } from '../wildfires/mapper.ts'
import type { FIRMSQueryParams } from '../wildfires/schema.ts'
import { FIRMSWildfireResponseSchema } from '../wildfires/schema.ts'
import type {
  USGSEarthquakeQueryParams,
  USGSEarthquakeResponse,
} from '../earthquakes/schema.ts'
import type {
  GVPEruptionResponse,
  GVPEruptionQueryParams,
} from '../eruptions/schema.ts'

export const getEarthquakes = async (params: USGSEarthquakeQueryParams) => {
  const response = await axios.get<USGSEarthquakeResponse>(
    providers.usgs.earthquakes.baseUrl,
    { params: { ...providers.usgs.earthquakes.defaults, ...params } },
  )
  return mapEarthquake(response.data)
}

export const getEruptions = async (params: GVPEruptionQueryParams) => {
  const response = await axios.get<GVPEruptionResponse>(
    providers.gvp.eruptions.baseUrl,
    { params: { ...providers.gvp.eruptions.defaults, ...params } },
  )
  return mapEruption(response.data)
}

export const getWildfires = async (params: FIRMSQueryParams) => {
  const { source, area, dayRange } = params
  const url = `${providers.firms.wildfires.baseUrl}/${source}/${area}/${dayRange}`

  const response = await axios.get(url, { responseType: 'text' })

  const csv = Papa.parse<Record<string, string>>(response.data, {
    header: true,
    skipEmptyLines: true,
  })

  const parsed = FIRMSWildfireResponseSchema.parse(csv.data)
  return mapWildfire(parsed)
}
