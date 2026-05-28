import axios from 'axios'
import type {
  USGSEarthquakeResponse,
  GVPEruptionResponse,
} from '../models/hazards.ts'
import type {
  EarthquakeQueryParams,
  EruptionQueryParams,
} from '../models/hazards.ts'
import { providers } from '../providers.ts'
import { mapEarthquake, mapEruption } from '../utils/hazards.ts'
import Papa from 'papaparse'
import {
  FIRMSWildfireResponseSchema,
  type WildfireQueryParams,
} from '../models/hazards.ts'
import { mapWildfire } from '../utils/hazards.ts'

export const getEarthquakes = async (params: EarthquakeQueryParams) => {
  const response = await axios.get<USGSEarthquakeResponse>(
    providers.usgs.earthquakes.baseUrl,
    { params: { ...providers.usgs.earthquakes.defaults, ...params } },
  )
  return mapEarthquake(response.data)
}

export const getEruptions = async (params: EruptionQueryParams) => {
  const response = await axios.get<GVPEruptionResponse>(
    providers.gvp.eruptions.baseUrl,
    { params: { ...providers.gvp.eruptions.defaults, ...params } },
  )
  return mapEruption(response.data)
}

export const getWildfires = async (params: WildfireQueryParams) => {
  const { defaults, baseUrl } = providers.firms.wildfires
  const source = params.source ?? defaults.source
  const area = params.area ?? defaults.area
  const dayRange = params.dayRange ?? defaults.dayRange

  // FIRMS uses path segments, not query params
  const segments = [baseUrl, source, area, dayRange]
  if (params.date) segments.push(params.date)
  const url = segments.join('/')

  const response = await axios.get(url, { responseType: 'text' })

  const csv = Papa.parse<Record<string, string>>(response.data, {
    header: true,
    skipEmptyLines: true,
  })

  const parsed = FIRMSWildfireResponseSchema.parse(csv.data)
  return mapWildfire(parsed)
}