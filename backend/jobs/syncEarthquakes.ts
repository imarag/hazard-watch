import { providers } from '../hazards/shared/static.ts'
import { datesBefore, countTableRows, upsertRecords } from '../lib/utils.ts'
import { logger } from '../lib/logger.ts'
import type { USGSEarthquakeResponse } from '../hazards/earthquakes/types.ts'
import { transformEarthquakes } from '../hazards/earthquakes/transform.ts'
import { logSyncError } from './utils.ts'

export async function syncEarthquakes() {
  try {
    const provider = providers.usgs.earthquakes

    const totalRows = await countTableRows('earthquakes')
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
