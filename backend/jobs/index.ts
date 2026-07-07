import cron from 'node-cron'
import {
  syncEarthquakes,
  syncEruptions,
  syncTsunamis,
  syncWildfires,
  cleanHazards
} from '../modules/hazards/index.js'
import config from '../lib/config.js'
import type { HazardType } from '../modules/hazards/index.js'
import { logger } from '../lib/logger.js'

const IS_DEV = config.NODE_ENV === 'development'

const schedules: Record<HazardType | 'clean', string> = {
  earthquake: IS_DEV
    ? config.CRON_EARTHQUAKES_DEV
    : config.CRON_EARTHQUAKES_PROD,
  wildfire: IS_DEV ? config.CRON_WILDFIRES_DEV : config.CRON_WILDFIRES_PROD,
  tsunami: IS_DEV ? config.CRON_TSUNAMIS_DEV : config.CRON_TSUNAMIS_PROD,
  eruption: IS_DEV ? config.CRON_ERUPTIONS_DEV : config.CRON_ERUPTIONS_PROD,
  clean: IS_DEV ? config.CRON_CLEAN_DEV : config.CRON_CLEAN_PROD,
}

export function startCronJobs() {
  logger.info('Starting cron jobs.')
  cron.schedule(schedules.earthquake, async () => {
    await syncEarthquakes()
  })

  cron.schedule(schedules.wildfire, async () => {
    await syncWildfires()
  })

  cron.schedule(schedules.tsunami, async () => {
    await syncTsunamis()
  })

  cron.schedule(schedules.eruption, async () => {
    await syncEruptions()
  })

  cron.schedule(schedules.clean, async () => {
    await cleanHazards()
  })
}
