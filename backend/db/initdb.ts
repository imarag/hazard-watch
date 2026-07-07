import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pool from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function initDB() {
  const sql = readFileSync(join(__dirname, 'init.sql'), 'utf-8')
  const client = await pool.connect()

  try {
    await client.query(sql)
    console.log('✅ Tables created successfully')
  } catch (err) {
    console.error('❌ Failed to initialize database:', err)
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

initDB()