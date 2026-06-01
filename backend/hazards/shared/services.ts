import axios from 'axios'
import Papa from 'papaparse'
import { providers } from '../shared/static.ts'
import { mapEarthquake } from '../earthquakes/mapper.ts'
import { mapEruption } from '../eruptions/mapper.ts'
import { mapWildfire } from '../wildfires/mapper.ts'
import { mapTsunami } from '../tsunamis/mapper.ts'
import type { WildfireQueryParams } from '../wildfires/schema.ts'
import { FIRMSWildfireResponseSchema } from '../wildfires/schema.ts'
import type { EarthquakeQueryParams } from '../earthquakes/schema.ts'
import type { EruptionQueryParams } from '../eruptions/schema.ts'
import type { TsunamiQueryParams } from '../tsunamis/schema.ts'
import { logger } from '../../lib/logger.ts'

export const getEarthquakes = async (params: EarthquakeQueryParams) => {
  const queryParams = {
    ...providers.usgs.earthquakes.defaults,
    starttime: params.starttime,
    endtime: params.endtime,
    minmagnitude: params.minmagnitude,
    maxmagnitude: params.maxmagnitude,
    mindepth: params.mindepth,
    maxdepth: params.maxdepth,
    ...(params.minLat !== undefined && {
      minlatitude: params.minLat,
      maxlatitude: params.maxLat,
      minlongitude: params.minLng,
      maxlongitude: params.maxLng,
    }),
  }
  logger.info(
    `GET ${axios.getUri({ url: providers.usgs.earthquakes.baseUrl, params: queryParams })}`,
  )
  const response = await axios.get(providers.usgs.earthquakes.baseUrl, {
    params: queryParams,
  })
  return mapEarthquake(response.data)
}

export const getEruptions = async (params: EruptionQueryParams) => {
  const hasBbox =
    params.minLng !== undefined &&
    params.minLat !== undefined &&
    params.maxLng !== undefined &&
    params.maxLat !== undefined

  const cqlFilters: string[] = []
  if (params.confirmedOnly)
    cqlFilters.push(`Activity_Type = 'Confirmed Eruption'`)
  if (params.minExplosivity !== undefined)
    cqlFilters.push(`ExplosivityIndexMax >= ${params.minExplosivity}`)
  if (hasBbox)
    cqlFilters.push(
      `BBOX(GeoLocation,${params.minLat},${params.minLng},${params.maxLat},${params.maxLng})`,
    )

  const queryParams = {
    ...providers.gvp.eruptions.defaults,
    ...(cqlFilters.length > 0 && { CQL_FILTER: cqlFilters.join(' AND ') }),
  }
  logger.info(
    `GET ${axios.getUri({ url: providers.gvp.eruptions.baseUrl, params: queryParams })}`,
  )
  const response = await axios.get(providers.gvp.eruptions.baseUrl, {
    params: queryParams,
  })
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
  logger.info(`GET ${url}`)
  const response = await axios.get(url, { responseType: 'text' })
  const csv = Papa.parse<Record<string, string>>(response.data, {
    header: true,
    skipEmptyLines: true,
  })
  const parsed = FIRMSWildfireResponseSchema.parse(csv.data)
  return mapWildfire(parsed)
}

export const getTsunamis = async (params: TsunamiQueryParams) => {
  const queryParams = {
    ...providers.noaa.tsunamis.defaults,
    ...(params.minLat !== undefined &&
      params.maxLat !== undefined &&
      params.minLng !== undefined &&
      params.maxLng !== undefined && {
        minLatitude: params.minLat,
        maxLatitude: params.maxLat,
        minLongitude: params.minLng,
        maxLongitude: params.maxLng,
      }),
    ...(params.minMaxWaterHeight !== undefined &&
      params.minMaxWaterHeight > 0 && {
        minMaxWaterHeight: params.minMaxWaterHeight,
      }),
    ...(params.minDeathsAmountOrder !== undefined &&
      params.minDeathsAmountOrder > 0 && {
        minDeathsAmountOrder: params.minDeathsAmountOrder,
      }),
  }
  logger.info(
    `GET ${axios.getUri({ url: providers.noaa.tsunamis.baseUrl, params: queryParams })}`,
  )
  const response = await axios.get(providers.noaa.tsunamis.baseUrl, {
    params: queryParams,
  })
  return mapTsunami(response.data)
}
