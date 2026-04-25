import z from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const REFRESH_TOKEN_KEY = 'refresh_token'

const configSchema = z.object({
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_KEY: z.string(),
  NODE_ENV: z.enum(['production', 'development']),
  PORT: z.coerce.number().int(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
})

const config = configSchema.parse({
  JWT_SECRET: process.env['JWT_SECRET'],
  REFRESH_TOKEN_KEY: REFRESH_TOKEN_KEY,
  NODE_ENV: process.env['NODE_ENV'],
  PORT: process.env['PORT'],
  MONGO_DB_USERNAME: process.env['MONGO_DB_USERNAME'],
  MONGO_DB_PASSWORD: process.env['MONGO_DB_PASSWORD'],
})

export default config
