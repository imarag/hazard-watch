import app from './app.js'
import config from './config.js'
import { logger } from './utils/logger.js'

app.listen(config.PORT, () => logger.info('Running on port ' + config.PORT))