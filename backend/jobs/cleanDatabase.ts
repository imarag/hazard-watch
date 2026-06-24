import pool from '../db/db.ts'
import { logger } from '../lib/logger.ts'
import config from '../lib/config.ts'

export async function cleanDatabase() {
  try {
    logger.info('[clean] starting database cleanup')

    const eq = await pool.query(
      `DELETE FROM earthquakes WHERE occurred_at < NOW() - INTERVAL '${config.EARTHQUAKES_RETENTION_DAYS} days'`,
    )
    logger.info(`[clean] earthquakes — deleted ${eq.rowCount} old records`)

    const wf = await pool.query(
      `DELETE FROM wildfires WHERE detected_at < NOW() - INTERVAL '${config.WILDFIRES_RETENTION_DAYS} days'`,
    )
    logger.info(`[clean] wildfires — deleted ${wf.rowCount} old records`)

    logger.info('[clean] done — tsunamis and eruptions kept forever')
  } catch (err) {
    logger.error(`[clean] failed: ${err}`)
  }
}
