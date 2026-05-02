import z from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const REFRESH_TOKEN_KEY = 'refresh_token'

const configSchema = z.object({
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_KEY: z.string(),
  REFRESH_TOKEN_DUR: z.number(),
  ACCESS_TOKEN_DUR: z.number(),
  NODE_ENV: z.enum(['production', 'development']),
  PORT: z.coerce.number().int(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  GMAIL_USER: z.string(),
  GMAIL_APP_PASSWORD: z.string(),
  CLIENT_URL: z.string(),
})

const SECONDS = 1
const MINUTES = 60 * SECONDS
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS

const config = configSchema.parse({
  JWT_SECRET: process.env['JWT_SECRET'],
  REFRESH_TOKEN_KEY: REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_DUR: 15 * MINUTES,
  REFRESH_TOKEN_DUR: 7 * DAYS,
  NODE_ENV: process.env['NODE_ENV'],
  PORT: process.env['PORT'],
  MONGO_DB_USERNAME: process.env['MONGO_DB_USERNAME'],
  MONGO_DB_PASSWORD: process.env['MONGO_DB_PASSWORD'],
  GMAIL_USER: process.env['GMAIL_USER'],
  GMAIL_APP_PASSWORD: process.env['GMAIL_APP_PASSWORD'],
  CLIENT_URL: process.env['CLIENT_URL'],
})

export default config
