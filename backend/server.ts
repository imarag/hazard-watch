import mongoose from 'mongoose'
import config from './config.ts'

const uri = `mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@clustermongo.wn3vaaa.mongodb.net/HazardWatch?appName=ClusterMongo`

export async function connectDb() {
  await mongoose.connect(uri)
}
