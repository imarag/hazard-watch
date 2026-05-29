import app from './app.js'
import config from './lib/config.ts'
import { logger } from './lib/logger.ts'

app.listen(config.PORT, () => logger.info('Running on port ' + config.PORT))