import pool from '../../db/db.js'
import config from '../../lib/config.js'

export const deleteRecords = async (table: string, days: number) => {
  const result = await pool.query(
    `DELETE FROM ${table} WHERE occurred_at < NOW() - INTERVAL '${days} days'`,
  )
  return result
}

export const countTableRows = async (table: string) => {
  const result = await pool.query(`SELECT COUNT(*) FROM ${table}`)
  return result.rows[0].count
}

export const upsertRecords = async (
  table: string,
  conflictColumn: string,
  records: Record<string, unknown>[],
): Promise<number> => {
  if (records.length === 0) return 0
  if (records.length < config.BATCH_THRESHOLD) {
    return upsertRecordsOne(table, conflictColumn, records)
  }
  return upsertRecordsBatch(table, records)
}

async function upsertRecordsOne(
  table: string,
  conflictColumn: string,
  records: Record<string, unknown>[],
): Promise<number> {
  const columns = Object.keys(records[0]!)
  const values: unknown[] = []

  const placeholders = records.map((row, rowIndex) => {
    const offset = rowIndex * columns.length
    values.push(...Object.values(row))
    return `(${columns.map((_, ci) => `$${offset + ci + 1}`).join(', ')})`
  })

  const setClause = columns
    .filter((col) => col !== conflictColumn)
    .map((col) => `${col} = EXCLUDED.${col}`)
    .join(', ')

  const result = await pool.query(
    `INSERT INTO ${table} (${columns.join(', ')})
     VALUES ${placeholders.join(', ')}
     ON CONFLICT (${conflictColumn}) DO UPDATE SET ${setClause}`,
    values,
  )

  return result.rowCount ?? 0
}

async function upsertRecordsBatch(
  table: string,
  records: Record<string, unknown>[],
): Promise<number> {
  const columns = Object.keys(records[0]!)
  const batches: Promise<number>[] = []

  for (let i = 0; i < records.length; i += config.BATCH_SIZE) {
    const batch = records.slice(i, i + config.BATCH_SIZE)
    const values: unknown[] = []

    const placeholders = batch.map((row, rowIndex) => {
      const offset = rowIndex * columns.length
      values.push(...Object.values(row))
      return `(${columns.map((_, ci) => `$${offset + ci + 1}`).join(', ')})`
    })

    batches.push(
      pool
        .query(
          `INSERT INTO ${table} (${columns.join(', ')})
         VALUES ${placeholders.join(', ')}
         ON CONFLICT DO NOTHING`,
          values,
        )
        .then((r) => r.rowCount ?? 0),
    )
  }

  const results = await Promise.all(batches)
  return results.reduce((sum, n) => sum + n, 0)
}