import { providers } from '../hazards/shared/static.ts'
import { logger } from '../lib/logger.ts'
import { upsertRecords } from '../lib/utils.ts'
import { transformTsunamis } from '../hazards/tsunamis/transform.ts'
import type { NOAATsunamiResponse } from '../hazards/tsunamis/types.ts'
import { logSyncError } from './utils.ts'

export async function syncTsunamis() {
  try {
    const provider = providers.noaa.tsunamis
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

    logger.info(`[tsunamis] done — ${inserted} upserted, ${allItems.length - inserted} skipped`)
  } catch (err) {
    logSyncError('tsunamis', err)
  }
}