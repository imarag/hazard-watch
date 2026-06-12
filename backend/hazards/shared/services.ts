import pool from '../../lib/db.ts'
import { logger } from '../../lib/logger.ts'
import type { GlobalHazardParams } from './schema.ts'
import type { EarthquakeDisplay } from '../earthquakes/schema.ts'
import type { EruptionDisplay } from '../eruptions/schema.ts'
import type { WildfireDisplay } from '../wildfires/schema.ts'
import type { TsunamiDisplay } from '../tsunamis/schema.ts'

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
  params: GlobalHazardParams,
): Promise<EarthquakeDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']

  addFilter(
    values,
    filters,
    params.startdate ? new Date(params.startdate) : undefined,
    'occurred_at >= ?',
  )
  addFilter(
    values,
    filters,
    params.enddate ? new Date(params.enddate) : undefined,
    'occurred_at <= ?',
  )
  addFilter(values, filters, params.minMagnitude, 'magnitude >= ?')
  addFilter(values, filters, params.maxMagnitude, 'magnitude <= ?')
  addFilter(values, filters, params.minDepth, 'depth_km >= ?')
  addFilter(values, filters, params.maxDepth, 'depth_km <= ?')

  const sql = `SELECT * FROM earthquakes ${buildWhere(filters)}`
  logger.info(sql)
  const result = await pool.query<EarthquakeDisplay>(sql, values)
  return result.rows
}

export const getEruptions = async (
  params: GlobalHazardParams,
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

  const sql = `SELECT * FROM eruptions ${buildWhere(filters)}`
  logger.info(sql)
  const result = await pool.query<EruptionDisplay>(sql, values)
  return result.rows
}

export const getWildfires = async (
  params: GlobalHazardParams,
): Promise<WildfireDisplay[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = ['ST_Within(geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))']

  addFilter(
    values,
    filters,
    params.startdate ? new Date(params.startdate) : undefined,
    'detected_at >= ?',
  )
  addFilter(
    values,
    filters,
    params.enddate ? new Date(params.enddate) : undefined,
    'detected_at <= ?',
  )

  const sql = `SELECT * FROM wildfires ${buildWhere(filters)}`
  logger.info(sql)
  const result = await pool.query<WildfireDisplay>(sql, values)
  return result.rows
}

export const getTsunamis = async (
  params: GlobalHazardParams,
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

  const sql = `SELECT * FROM tsunamis ${buildWhere(filters)}`
  logger.info(sql)
  const result = await pool.query<TsunamiDisplay>(sql, values)
  return result.rows
}
