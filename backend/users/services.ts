import pool from '../db/db.ts'
import type { UserRegister } from '../users/schema.ts'
import type { UserInDb } from './types.ts'
import { buildQueryParts } from '../db/utils.ts'

const getUserByEmail = async (email: string): Promise<UserInDb | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ])
  return result.rows[0] ?? null
}

const getUserById = async (userId: string): Promise<UserInDb | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
  return result.rows[0] ?? null
}

const createUser = async (user: UserRegister): Promise<UserInDb> => {
  const { columnsJoinStr, placeholdersJoinStr, valuesList } =
    buildQueryParts(user)
  const queryText = `INSERT INTO users (${columnsJoinStr}) VALUES (${placeholdersJoinStr}) RETURNING *`
  const result = await pool.query(queryText, valuesList)
  return result.rows[0]
}

const updateUser = async (
  userId: string,
  data: Partial<UserInDb>,
): Promise<UserInDb | null> => {
  const { setFieldsClause, valuesList } = buildQueryParts(data, 2)
  const queryText = `UPDATE users SET ${setFieldsClause} WHERE id = $1 RETURNING *`
  const result = await pool.query(queryText, [userId, ...valuesList])
  return result.rows[0] ?? null
}

export default {
  getUserByEmail,
  getUserById,
  updateUser,
  createUser,
}
