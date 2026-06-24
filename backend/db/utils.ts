import pool from './db.ts'
import config from '../lib/config.ts'

export const buildQueryParts = (data: Record<string, unknown>, startAt = 1) => {
  const keys = Object.keys(data)
  const valuesList = Object.values(data)
  const columnsJoinStr = keys.join(', ')
  const placeholdersJoinStr = keys.map((_, i) => `$${i + startAt}`).join(', ')
  const setFieldsClause = keys
    .map((k, i) => `${k} = $${i + startAt}`)
    .join(', ')
  return { columnsJoinStr, placeholdersJoinStr, setFieldsClause, valuesList }
}

export async function countTableRows(table: string) {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM ${table}`)
  return rows[0].count
}

export async function upsertRecords(
  table: string,
  conflictColumn: string,
  records: Record<string, unknown>[],
): Promise<number> {
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
