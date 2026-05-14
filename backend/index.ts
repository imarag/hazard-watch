import app from './app.ts'
import { connectDb } from './server.ts'
import config from './config.ts'
import { logger } from './utils/logger.ts'

connectDb()
  .then(() => logger.info('Connected to Mongo DB'))
  .catch(() => logger.error('Cannot connect to Mongo DB'))

app.listen(config.PORT, () => logger.info('Running on port ' + config.PORT))
