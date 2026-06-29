import app from './app.js'
import config from './lib/config.js'
import { logger } from './lib/logger.js'
import { startCronJobs } from './jobs/index.js'

app.listen(config.PORT, () => {
  logger.info('Running on port ' + config.PORT)
  startCronJobs()
})
