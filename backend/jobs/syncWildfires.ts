import { providers } from '../hazards/shared/static.ts'
import { logger } from '../lib/logger.ts'
import { FIRMSWildfireResponseSchema } from '../hazards/wildfires/schema.ts'
import { transformWildfires } from '../hazards/wildfires/transform.ts'
import { upsertRecords } from '../lib/utils.ts'
import { logSyncError } from './utils.ts'

export async function syncWildfires() {
  try {
    const provider = providers.firms.wildfires
    const { source, dayRange } = provider.defaults
    const url = `${provider.baseUrl}/${source}/world/${dayRange}`

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
