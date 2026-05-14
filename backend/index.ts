import app from './app.js'
import { connectDb } from './server.js'
import config from './config.js'
import { logger } from './utils/logger.js'

connectDb()
  .then(() => logger.info('Connected to Mongo DB'))
  .catch(() => logger.error('Cannot connect to Mongo DB'))

app.listen(config.PORT, () => logger.info('Running on port ' + config.PORT))
