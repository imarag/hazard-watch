import app from './app.js'
import config from './lib/config.ts'
import { logger } from './lib/logger.ts'
import { startCronJobs } from './jobs/index.js'

app.listen(config.PORT, () => {
  logger.info('Running on port ' + config.PORT)
  logger.info('Starting cron jobs.')
  startCronJobs()
})
