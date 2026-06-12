import { Pool } from 'pg'
import config from './config.ts'

const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: 10,
})

async function queryDB() {
  const { rows } = await pool.query(
    `SELECT title, ST_AsGeoJSON(geom) AS geom FROM posts`,
  )

  console.log(JSON.stringify(rows, null, 2))
}

queryDB()
