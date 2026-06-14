import cron from 'node-cron'
import { syncEarthquakes } from './syncEarthquakes.js'
import { syncWildfires } from './syncWildfires.js'
import { syncTsunamis } from './syncTsunamis.js'
import { syncEruptions } from './syncEruptions.js'
import { cleanDatabase } from './cleanDatabase.ts'
import config from '../lib/config.js'

const IS_DEV = config.NODE_ENV === 'development'

const schedules = {
  earthquakes: IS_DEV ? config.CRON_EARTHQUAKES_DEV : config.CRON_EARTHQUAKES_PROD,
  wildfires:   IS_DEV ? config.CRON_WILDFIRES_DEV   : config.CRON_WILDFIRES_PROD,
  tsunamis:    IS_DEV ? config.CRON_TSUNAMIS_DEV     : config.CRON_TSUNAMIS_PROD,
  eruptions:   IS_DEV ? config.CRON_ERUPTIONS_DEV    : config.CRON_ERUPTIONS_PROD,
  clean:       IS_DEV ? config.CRON_CLEAN_DEV        : config.CRON_CLEAN_PROD,
}

export function startCronJobs() {
  cron.schedule(schedules.earthquakes, async () => {
    await syncEarthquakes()
  })

  cron.schedule(schedules.wildfires, async () => {
    await syncWildfires()
  })

  cron.schedule(schedules.tsunamis, async () => {
    await syncTsunamis()
  })

  cron.schedule(schedules.eruptions, async () => {
    await syncEruptions()
  })

  cron.schedule(schedules.clean, async () => {
    await cleanDatabase()
  })
}