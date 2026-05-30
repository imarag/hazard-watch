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
import type { GlobalHazardParams } from '../shared/schema.ts'

export const getEarthquakes = async (
  params: EarthquakeQueryParams,
  global: GlobalHazardParams,
) => {
  const response = await axios.get<USGSEarthquakeResponse>(
    providers.usgs.earthquakes.baseUrl,
    {
      params: {
        ...providers.usgs.earthquakes.defaults,
        ...params,
        starttime: global.starttime,
        endtime: global.endtime,
        ...(global.minLat && {
          minlatitude: global.minLat,
          maxlatitude: global.maxLat,
          minlongitude: global.minLng,
          maxlongitude: global.maxLng,
        }),
      },
    },
  )
  return mapEarthquake(response.data)
}

export const getEruptions = async (
  params: EruptionQueryParams,
  global: GlobalHazardParams,
) => {
  const cqlFilters = []

  if (global.minLng !== undefined) {
    cqlFilters.push(
      `BBOX(GeoLocation,${global.minLng},${global.minLat},${global.maxLng},${global.maxLat})`,
    )
  }

  const response = await axios.get<GVPEruptionResponse>(
    providers.gvp.eruptions.baseUrl,
    {
      params: {
        ...providers.gvp.eruptions.defaults,
        ...params,
        ...(cqlFilters.length > 0 && { CQL_FILTER: cqlFilters.join(' AND ') }),
      },
    },
  )
  return mapEruption(response.data)
}

export const getWildfires = async (
  params: WildfireQueryParams,
  global: GlobalHazardParams,
) => {
  const { source, dayRange } = params
  const area =
    global.minLng !== undefined
      ? `${global.minLng},${global.minLat},${global.maxLng},${global.maxLat}`
      : 'world'
  const resolvedDayRange = global.starttime
    ? Math.min(
        Math.ceil(
          (Date.now() - new Date(global.starttime).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
        10,
      )
    : dayRange

  const url = `${providers.firms.wildfires.baseUrl}/${source}/${area}/${resolvedDayRange}`

  const response = await axios.get(url, { responseType: 'text' })
  const csv = Papa.parse<Record<string, string>>(response.data, {
    header: true,
    skipEmptyLines: true,
  })
  const parsed = FIRMSWildfireResponseSchema.parse(csv.data)
  return mapWildfire(parsed)
}
