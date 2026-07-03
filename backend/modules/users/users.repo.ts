import pool from '../../db/db.js'
import type { UserInDb } from './users.types.js'
import type { UserRegister } from '../auth/index.js'
import { buildQueryParts } from '../../db/utils.js'

export const getByEmail = async (email: string) => {
  const sql = `SELECT * FROM users WHERE email = $1`
  const result = await pool.query<UserInDb>(sql, [email])
  return result.rows[0]
}

export const getById = async (id: string) => {
  const sql = `SELECT * FROM users WHERE id = $1`
  const result = await pool.query<UserInDb>(sql, [id])
  return result.rows[0]
}

export const createOne = async (data: UserRegister) => {
  const { columnsJoinStr, placeholdersJoinStr, valuesList } =
    buildQueryParts(data)
  const sql = `
    INSERT INTO users (${columnsJoinStr}) VALUES (${placeholdersJoinStr}) 
    RETURNING *`
  const result = await pool.query<UserInDb>(sql, valuesList)
  return result.rows[0]
}

export const updateOne = async (id: string, data: Partial<UserInDb>) => {
  const { setFieldsClause, valuesList } = buildQueryParts(data, 2)
  const sql = `
    UPDATE users SET ${setFieldsClause} WHERE id = $1 
    RETURNING *`
  const result = await pool.query<UserInDb>(sql, [id, ...valuesList])
  return result.rows[0]
}
