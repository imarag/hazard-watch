import mongoose from 'mongoose'
import config from './config.js'
import { logger } from './utils/logger.js'

const uri = `mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@clustermongo.wn3vaaa.mongodb.net/${config.MONGO_DB_NAME}?appName=ClusterMongo`

export async function connectDb() {
  try {
    await mongoose.connect(uri)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error)
  }
}
