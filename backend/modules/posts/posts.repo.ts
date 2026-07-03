import pool from '../../db/db.js'
import { buildQueryParts } from '../../db/utils.js'
import type { CreatePostDbData, UpdatePostDbData, PostQueryParams } from './posts.schemas.js'
import type { Post } from './posts.types.js'
import type { MapQueryParams } from '../hazards/index.js'

const POST_SELECT = `
  SELECT
    posts.id,
    posts.created_at AS "createdAt",
    posts.updated_at AS "updatedAt",
    posts.title,
    posts.hazard_type AS "hazardType",
    posts.description,
    ST_X(posts.geom) AS longitude,
    ST_Y(posts.geom) AS latitude,
    json_build_object(
      'id', users.id,
      'name', users.name,
      'email', users.email
    ) AS author
  FROM posts
  JOIN users ON posts.author_id = users.id
`

const getForMap = async (
  params: MapQueryParams & PostQueryParams,
): Promise<Post[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const conditions = [
    'ST_Within(posts.geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))',
  ]

  if (params.startDate) {
    values.push(params.startDate)
    conditions.push(`posts.created_at >= $${values.length}`)
  }
  if (params.endDate) {
    values.push(params.endDate)
    conditions.push(`posts.created_at <= $${values.length}`)
  }
  if (params.hazardType) {
    values.push(params.hazardType)
    conditions.push(`posts.hazard_type = $${values.length}`)
  }

  const sql = `${POST_SELECT} WHERE ${conditions.join(' AND ')} ORDER BY posts.created_at DESC LIMIT 1000`
  const result = await pool.query<Post>(sql, values)
  return result.rows
}

type SearchArgs = { q?: string; limit: number; offset: number }

const search = async ({ q, limit, offset }: SearchArgs) => {
  const values: unknown[] = []
  let whereClause = ''

  if (q) {
    values.push(`%${q}%`)
    whereClause = `WHERE posts.title ILIKE $1 OR posts.description ILIKE $1`
  }

  const filterValues = [...values]
  values.push(limit, offset)

  const [postsResult, countResult] = await Promise.all([
    pool.query<Post>(
      `${POST_SELECT}
       ${whereClause}
       ORDER BY posts.created_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      values,
    ),
    pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM posts ${whereClause}`,
      filterValues,
    ),
  ])

  return {
    posts: postsResult.rows,
    total: parseInt(countResult.rows[0]?.count ?? '0', 10),
  }
}

const getById = async (id: string): Promise<Post | undefined> => {
  const sql = `${POST_SELECT} WHERE posts.id = $1`
  const result = await pool.query<Post>(sql, [id])
  return result.rows[0]
}

const insert = async (data: CreatePostDbData): Promise<Post | undefined> => {
  const { columnsJoinStr, placeholdersJoinStr, valuesList } =
    buildQueryParts(data)
  const sql = `
    WITH new_post AS (
        INSERT INTO posts (${columnsJoinStr}) VALUES (${placeholdersJoinStr})
        RETURNING *
    )
    ${POST_SELECT.replace('FROM posts', 'FROM new_post AS posts')}
  `
  const result = await pool.query<Post>(sql, valuesList)
  return result.rows[0]
}

const update = async (
  id: string,
  data: UpdatePostDbData,
): Promise<Post | undefined> => {
  const { setFieldsClause, valuesList } = buildQueryParts(data, 2)
  const sql = `
    WITH updated_post AS (
        UPDATE posts SET ${setFieldsClause} WHERE id = $1
        RETURNING *
    )
    ${POST_SELECT.replace('FROM posts', 'FROM updated_post AS posts')}
    `
  const result = await pool.query<Post>(sql, [id, ...valuesList])
  return result.rows[0]
}

const remove = async (id: string): Promise<number> => {
  const sql = 'DELETE FROM posts WHERE id = $1'
  const result = await pool.query(sql, [id])
  return result.rowCount ?? 0
}

export default { getForMap, search, getById, insert, update, remove }