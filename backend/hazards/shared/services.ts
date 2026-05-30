import axios from 'axios'
import Papa from 'papaparse'
import { providers } from '../shared/static.ts'
import { mapEarthquake } from '../earthquakes/mapper.ts'
import { mapEruption } from '../eruptions/mapper.ts'
import { mapWildfire } from '../wildfires/mapper.ts'
import type { WildfireQueryParams } from '../wildfires/schema.ts'
import { FIRMSWildfireResponseSchema } from '../wildfires/schema.ts'
import type {
  EarthquakeQueryParams,
  USGSEarthquakeResponse,
} from '../earthquakes/schema.ts'
import type {
  GVPEruptionResponse,
  EruptionQueryParams,
} from '../eruptions/schema.ts'

export const getEarthquakes = async (params: EarthquakeQueryParams) => {
  console.log(params, '****')
  const response = await axios.get<USGSEarthquakeResponse>(
    providers.usgs.earthquakes.baseUrl,
    {
      params: {
        ...providers.usgs.earthquakes.defaults,
        starttime: params.starttime,
        endtime: params.endtime,
        minmagnitude: params.minmagnitude,
        maxmagnitude: params.maxmagnitude,
        mindepth: params.mindepth,
        maxdepth: params.maxdepth,
        minlatitude: params.minLat,
        maxlatitude: params.maxLat,
        minlongitude: params.minLng,
        maxlongitude: params.maxLng,
      },
    },
  )
  return mapEarthquake(response.data)
}

export const getEruptions = async (params: EruptionQueryParams) => {
  const hasBbox =
    params.minLng !== undefined &&
    params.minLat !== undefined &&
    params.maxLng !== undefined &&
    params.maxLat !== undefined

  const bbox = hasBbox
    ? `${params.minLng},${params.minLat},${params.maxLng},${params.maxLat},EPSG:4326`
    : undefined

  const response = await axios.get<GVPEruptionResponse>(
    providers.gvp.eruptions.baseUrl,
    {
      params: {
        ...providers.gvp.eruptions.defaults,
        BBOX: bbox,
      },
    },
  )
  console.log(
    axios.getUri({
      url: providers.gvp.eruptions.baseUrl,
      params: { ...providers.gvp.eruptions.defaults, BBOX: bbox },
    }),
    '****9',
  )

  return mapEruption(response.data)
}

export const getWildfires = async (params: WildfireQueryParams) => {
  const area =
    params.minLng !== undefined &&
    params.minLat !== undefined &&
    params.maxLng !== undefined &&
    params.maxLat !== undefined
      ? `${params.minLng},${params.minLat},${params.maxLng},${params.maxLat}`
      : 'world'

  const url = `${providers.firms.wildfires.baseUrl}/${providers.firms.wildfires.defaults.source}/${area}/${providers.firms.wildfires.defaults.dayRange}`

  const response = await axios.get(url, { responseType: 'text' })
  const csv = Papa.parse<Record<string, string>>(response.data, {
    header: true,
    skipEmptyLines: true,
  })
  const parsed = FIRMSWildfireResponseSchema.parse(csv.data)
  return mapWildfire(parsed)
}
