import config from './config.ts'
import { Pool } from 'pg'

const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: 10,
})

export default pool
