import pool from '../../db/db.js'
import { logger } from '../../lib/logger.js'
import type {
  EarthquakeDisplay,
  EruptionDisplay,
  WildfireDisplay,
  TsunamiDisplay,
  MapQueryParams,
} from './hazards.types.js'
import type {
  EarthquakeQueryParams,
  EruptionQueryParams,
  TsunamiQueryParams,
  WildfireQueryParams,
} from './hazards.schemas.js'

const buildWhere = (filters: string[]) =>
  filters.length ? `WHERE ${filters.join(' AND ')}` : ''

const addFilter = (
  values: unknown[],
  filters: string[],
  value: unknown,
  clause: string,
) => {
  if (value === undefined) return
  values.push(value)
  filters.push(clause.replace('?', `$${values.length}`))
}

export const getEarthquakes = async (
  params: MapQueryParams & EarthquakeQueryParams,
): Promise<EarthquakeDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']
  console.log(minLng, minLat, maxLng, maxLat, '*****')
  addFilter(
    values,
    filters,
    params.startDate ? new Date(params.startDate) : undefined,
    'occurred_at >= ?',
  )
  addFilter(
    values,
    filters,
    params.endDate ? new Date(params.endDate) : undefined,
    'occurred_at <= ?',
  )
  addFilter(values, filters, params.minMagnitude, 'magnitude >= ?')
  addFilter(values, filters, params.maxMagnitude, 'magnitude <= ?')
  addFilter(values, filters, params.minDepth, 'depth_km >= ?')
  addFilter(values, filters, params.maxDepth, 'depth_km <= ?')

  const sql = `
    SELECT id, usgs_id, magnitude, location, occurred_at, depth_km,
           triggered_tsunami, review_status, alert_level,
           ST_X(geom) AS longitude, ST_Y(geom) AS latitude
    FROM earthquakes ${buildWhere(filters)}
  `
  logger.info(sql)
  const result = await pool.query<EarthquakeDisplay>(sql, values)
  return result.rows
}

export const getEruptions = async (
  params: MapQueryParams & EruptionQueryParams,
): Promise<EruptionDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']

  addFilter(
    values,
    filters,
    params.confirmedOnly ? true : undefined,
    'confirmed = ?',
  )
  addFilter(values, filters, params.minExplosivity, 'explosivity_index >= ?')

  const sql = `
    SELECT id, gvp_eruption_id, gvp_volcano_id, volcano_name, eruption_area,
           start_year, start_year_uncertainty, explosivity_index, confirmed,
           ST_X(geom) AS longitude, ST_Y(geom) AS latitude
    FROM eruptions ${buildWhere(filters)}
  `
  logger.info(sql)
  const result = await pool.query<EruptionDisplay>(sql, values)
  return result.rows
}

export const getWildfires = async (
  params: MapQueryParams & WildfireQueryParams,
): Promise<WildfireDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']

  addFilter(
    values,
    filters,
    params.startDate ? new Date(params.startDate) : undefined,
    'detected_at >= ?',
  )
  addFilter(
    values,
    filters,
    params.endDate ? new Date(params.endDate) : undefined,
    'detected_at <= ?',
  )
  addFilter(
    values,
    filters,
    params.minFireRadiativePower,
    'fire_radiative_power >= ?',
  )
  addFilter(values, filters, params.confidence, 'confidence = ?')
  addFilter(values, filters, params.timeOfDay, 'time_of_day = ?')

  const sql = `
    SELECT id, fire_radiative_power, brightness_temp_k, confidence,
           detected_at, time_of_day, satellite,
           ST_X(geom) AS longitude, ST_Y(geom) AS latitude
    FROM wildfires ${buildWhere(filters)}
  `
  logger.info(sql)
  const result = await pool.query<WildfireDisplay>(sql, values)
  return result.rows
}

export const getTsunamis = async (
  params: MapQueryParams & TsunamiQueryParams,
): Promise<TsunamiDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']

  addFilter(values, filters, params.minMaxWaterHeight, 'max_wave_height_m >= ?')
  addFilter(
    values,
    filters,
    params.minDeathsAmountOrder,
    'deaths_severity >= ?',
  )

  const sql = `
    SELECT id, noaa_id, location, country, year, max_wave_height_m, deaths,
           deaths_severity, earthquake_magnitude, cause, event_validity,
           intensity, region_code,
           ST_X(geom) AS longitude, ST_Y(geom) AS latitude
    FROM tsunamis ${buildWhere(filters)}
  `
  logger.info(sql)
  const result = await pool.query<TsunamiDisplay>(sql, values)
  return result.rows
}
