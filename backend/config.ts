import z from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const SECONDS = 1
const MINUTES = 60 * SECONDS
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS

const appConfig = {
  REFRESH_TOKEN_KEY: 'refresh_token',
  ACCESS_TOKEN_TTL: 15 * MINUTES,
  REFRESH_TOKEN_TTL: 7 * DAYS,
  REFRESH_TOKEN_DUR: 7 * DAYS,
  ACCESS_TOKEN_DUR: 15 * MINUTES,
}

const envConfig = {
  NODE_ENV: process.env['NODE_ENV'],
  PORT: process.env['PORT'],
  JWT_SECRET: process.env['JWT_SECRET'],
  MONGO_DB_USERNAME: process.env['MONGO_DB_USERNAME'],
  MONGO_DB_PASSWORD: process.env['MONGO_DB_PASSWORD'],
  MONGO_DB_NAME: process.env['MONGO_DB_NAME'],
  RESEND_API_KEY: process.env['RESEND_API_KEY'],
  MAIL_FROM: process.env['MAIL_FROM'],
  CLIENT_URL: process.env['CLIENT_URL'],
}

const rawConfig = {
  ...appConfig,
  ...envConfig,
}

const configSchema = z.object({
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_KEY: z.string(),
  REFRESH_TOKEN_TTL: z.number(),
  NODE_ENV: z.enum(['production', 'development']),
  ACCESS_TOKEN_TTL: z.number(),
  PORT: z.coerce.number().int(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  MONGO_DB_NAME: z.string(),
  RESEND_API_KEY: z.string(),
  MAIL_FROM: z.string(),
  CLIENT_URL: z.string(),
  REFRESH_TOKEN_DUR: z.number(),
  ACCESS_TOKEN_DUR: z.number(),
})

const config = configSchema.parse(rawConfig)

export default config
