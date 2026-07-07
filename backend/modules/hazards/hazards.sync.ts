import { logger } from "../../lib/logger.js"
import type { USGSEarthquakeResponse, NOAATsunamiResponse, GVPEruptionResponse} from "./hazards.types.js"
import { FIRMSWildfireResponseSchema } from "./hazards.schemas.js"
import { transformEarthquakes, transformTsunamis, transformWildfires, transformEruptions } from "./hazards.transform.js"
import { datesBefore } from "../../lib/utils.js"
import * as hazardsRepo from './hazards.repo.js'
import config from "../../lib/config.js"
import { logSyncError } from "./hazards.utils.js"
import { upsertRecords } from "./hazards.repo.js"
import { HAZARDS } from "./hazards.static.js"

export async function cleanHazards() {
  try {
    logger.info('[clean] starting database cleanup')

    const eq = await hazardsRepo.deleteRecords(
      'earthquakes',
      config.EARTHQUAKES_RETENTION_DAYS,
    )
    logger.info(`[clean] earthquakes — deleted ${eq.rowCount} old records`)

    const wf = await hazardsRepo.deleteRecords(
      'wildfires',
      config.WILDFIRES_RETENTION_DAYS,
    )
    logger.info(`[clean] wildfires — deleted ${wf.rowCount} old records`)

    logger.info('[clean] done — tsunamis and eruptions kept forever')
  } catch (err) {
    logger.error(`[clean] failed: ${err}`)
  }
}

export async function syncEarthquakes() {
  try {
    const provider = HAZARDS.earthquake.provider

    const totalRows = await hazardsRepo.countTableRows('earthquakes')
    const isFirstRun = totalRows === '0'

    logger.info(`[earthquakes] starting sync (first run: ${isFirstRun})`)

    const queryParams = new URLSearchParams({
      ...provider.defaults,
      starttime: isFirstRun ? datesBefore(30) : datesBefore(1),
    })

    logger.info(`[earthquakes] requesting: ${provider.baseUrl}?${queryParams}`)
    
    const res = await fetch(`${provider.baseUrl}?${queryParams}`)

    if (!res.ok) {
      throw new Error(`USGS API error: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as USGSEarthquakeResponse

    if (!data.features.length) {
      logger.info('[earthquakes] no new data from USGS')
      return
    }

    logger.info(
      `[earthquakes] fetched ${data.features.length} records from USGS`,
    )

    const records = transformEarthquakes(data)
    
    const inserted = await upsertRecords('earthquakes', 'usgs_id', records)

    logger.info(
      `[earthquakes] done — ${inserted} upserted, ${records.length - inserted} skipped`,
    )
  } catch (err) {
    logSyncError('earthquakes', err)
  }
}

export async function syncWildfires() {
  try {
    const provider = HAZARDS.wildfire.provider
    const { source, dayRange } = provider.defaults
    const url = `${provider.baseUrl}/${provider.apiKey}/${source}/world/${dayRange}`

    logger.info('[wildfires] starting sync')
    logger.info(`[wildfires] requesting: ${url}`)

    const res = await fetch(url)
    if (!res.ok) throw new Error(`FIRMS API error: ${res.status}`)

    const csv = await res.text()
    const lines = csv.trim().split('\n')

    if (lines.length <= 1) {
      logger.info('[wildfires] no data from FIRMS')
      return
    }

    const headers = lines[0].split(',')
    const parsed = lines.slice(1).map((line) => {
      const values = line.split(',')
      return Object.fromEntries(
        headers.map((h, i) => [h.trim(), values[i]?.trim()]),
      )
    })

    const data = FIRMSWildfireResponseSchema.parse(parsed)
    logger.info(`[wildfires] fetched ${data.length} records from FIRMS`)

    const records = transformWildfires(data)
    const inserted = await upsertRecords('wildfires', 'detected_at', records)

    logger.info(
      `[wildfires] done — ${inserted} inserted, ${records.length - inserted} skipped`,
    )
  } catch (err) {
    logSyncError('wildfires', err)
  }
}

export async function syncTsunamis() {
  try {
    const provider = HAZARDS.tsunami.provider
    const allItems: Record<string, unknown>[] = []
    let page = 1
    let totalPages = 1

    logger.info('[tsunamis] starting sync')

    do {
      const queryParams = new URLSearchParams({
        ...provider.defaults,
        page: String(page),
      })

      logger.info(`[tsunamis] fetching page ${page}/${totalPages}`)

      const res = await fetch(`${provider.baseUrl}?${queryParams}`)
      if (!res.ok) throw new Error(`NOAA API error: ${res.status}`)

      const data = (await res.json()) as NOAATsunamiResponse
      totalPages = data.totalPages
      allItems.push(...data.items)
      page++
    } while (page <= totalPages)

    logger.info(`[tsunamis] fetched ${allItems.length} records from NOAA`)

    const records = transformTsunamis(allItems)
    const inserted = await upsertRecords('tsunamis', 'noaa_id', records)

    logger.info(
      `[tsunamis] done — ${inserted} upserted, ${allItems.length - inserted} skipped`,
    )
  } catch (err) {
    logSyncError('tsunamis', err)
  }
}

export async function syncEruptions() {
  try {
    const provider = HAZARDS.eruption.provider

    logger.info('[eruptions] starting sync')

    const queryParams = new URLSearchParams({
      ...provider.defaults,
    })

    logger.info(`[eruptions] requesting: ${provider.baseUrl}?${queryParams}`)
    const res = await fetch(`${provider.baseUrl}?${queryParams}`)

    if (!res.ok) {
      throw new Error(`GVP API error: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as GVPEruptionResponse

    if (!data.features.length) {
      logger.info('[eruptions] no data from GVP')
      return
    }

    logger.info(`[eruptions] fetched ${data.features.length} records from GVP`)

    const records = transformEruptions(data)
    const inserted = await upsertRecords(
      'eruptions',
      'gvp_eruption_id',
      records,
    )

    logger.info(
      `[eruptions] done — ${inserted} upserted, ${records.length - inserted} skipped`,
    )
  } catch (err) {
    logSyncError('eruptions', err)
  }
}