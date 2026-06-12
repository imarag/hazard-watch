import z from 'zod'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

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
  FIRMS_MAP_KEY: process.env['FIRMS_MAP_KEY'],
  DB_HOST: process.env['DB_HOST'],
  DB_PORT: process.env['DB_PORT'],
  DB_NAME: process.env['DB_NAME'],
  DB_USER: process.env['DB_USER'],
  DB_PASSWORD: process.env['DB_PASSWORD'],
}

const rawConfig = {
  ...appConfig,
  ...envConfig,
}

const configSchema = z.object({
  REFRESH_TOKEN_KEY: z.string(),
  REFRESH_TOKEN_TTL: z.number(),
  REFRESH_TOKEN_DUR: z.number(),
  ACCESS_TOKEN_DUR: z.number(),
  ACCESS_TOKEN_TTL: z.number(),
  NODE_ENV: z.enum(['production', 'development']),
  PORT: z.coerce.number().int(),
  JWT_SECRET: z.string(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  MONGO_DB_NAME: z.string(),
  RESEND_API_KEY: z.string(),
  MAIL_FROM: z.string(),
  CLIENT_URL: z.string(),
  FIRMS_MAP_KEY: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().int(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
})

const config = configSchema.parse(rawConfig)

export default config
