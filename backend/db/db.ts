import config from '../lib/config.js'
import { Pool } from 'pg'

const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: config.DB_POOL_MAX,
})

export default pool
