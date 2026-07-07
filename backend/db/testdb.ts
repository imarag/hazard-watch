import { Pool } from 'pg'
import config from '../lib/config.js'

const pool = new Pool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  max: 10,
})

async function queryDB() {
  const columns = await pool.query(`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'earthquakes'
  `)

  // 2. Get min/max for numeric columns dynamically
  const numericCols = columns.rows
    .filter((c) =>
      ['integer', 'numeric', 'double precision'].includes(c.data_type),
    )
    .map((c) => c.column_name)

  const statsQuery = numericCols
    .map((col) => `MIN(${col}) AS min_${col}, MAX(${col}) AS max_${col}`)
    .join(', ')

  const stats = await pool.query(`SELECT ${statsQuery} FROM earthquakes`)

  // 3. Shape into filter config
  const config = columns.rows
    .map((col) => {
      const base = {
        id: col.column_name,
        label: col.column_name, // or a label map
        field: col.column_name,
      }

      if (['integer', 'numeric', 'double precision'].includes(col.data_type)) {
        return {
          ...base,
          type: 'range',
          min: stats.rows[0][`min_${col.column_name}`],
          max: stats.rows[0][`max_${col.column_name}`],
        }
      }

      if (col.data_type === 'timestamp with time zone') {
        return { ...base, type: 'daterange' }
      }

      if (col.data_type === 'text') {
        return { ...base, type: 'text' }
      }

      return null
    })
    .filter(Boolean)

  console.log(JSON.stringify(config, null, 2))
}

queryDB()
