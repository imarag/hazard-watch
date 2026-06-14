import { providers } from '../hazards/shared/static.ts'
import { logger } from '../lib/logger.ts'
import { upsertRecords } from '../lib/utils.ts'
import type { GVPEruptionResponse } from '../hazards/eruptions/types.ts'
import { transformEruptions } from '../hazards/eruptions/transform.ts'
import { logSyncError } from './utils.ts'

export async function syncEruptions() {
  try {
    const provider = providers.gvp.eruptions

    logger.info('[eruptions] starting sync')

    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(provider.defaults).map(([k, v]) => [k, String(v)]),
      ),
    )

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
