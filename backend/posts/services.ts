import pool from '../db/db.ts'
import { AppError } from '../errors.js'
import { buildQueryParts } from '../db/utils.ts'
import type { Post, SearchResult } from '../posts/types.ts'
import type {
  CreatePostData,
  UpdatePostData,
  SearchParams,
} from '../posts/schema.ts'
import type { GlobalHazardQueryParams } from '../hazards/shared/schema.ts'

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

export const getAllPosts = async (
  params: GlobalHazardQueryParams,
): Promise<Post[]> => {
  const [minLng, minLat, maxLng, maxLat] = params.bbox
  const values: unknown[] = [minLng, minLat, maxLng, maxLat]
  const filters = [
    'ST_Within(posts.geom, ST_MakeEnvelope($1, $2, $3, $4, 4326))',
  ]

  if (params.startDate) {
    values.push(new Date(params.startDate))
    filters.push(`posts.created_at >= $${values.length}`)
  }
  if (params.endDate) {
    values.push(new Date(params.endDate))
    filters.push(`posts.created_at <= $${values.length}`)
  }
  if (params.hazardType) {
    values.push(params.hazardType)
    filters.push(`posts.hazard_type = $${values.length}`)
  }

  const sql = `${POST_SELECT} WHERE ${filters.join(' AND ')} ORDER BY posts.created_at DESC`
  const result = await pool.query(sql, values)
  return result.rows
}

export const searchPosts = async ({
  q,
  page,
  limit,
}: SearchParams): Promise<SearchResult> => {
  const trimmed = q?.trim()
  const offset = (page - 1) * limit
  const values: unknown[] = []

  const conditions: { clause: string; value: unknown }[] = (
    [
      trimmed ? { clause: 'posts.title ILIKE ', value: `%${trimmed}%` } : null,
      trimmed
        ? { clause: 'posts.description ILIKE ', value: `%${trimmed}%` }
        : null,
    ] as ({ clause: string; value: unknown } | null)[]
  ).filter((c): c is { clause: string; value: unknown } => c !== null)

  const whereClause = conditions.length
    ? `WHERE ${conditions
        .map((c, i) => {
          values.push(c.value)
          return `${c.clause}$${i + 1}`
        })
        .join(' OR ')}`
    : ''

  values.push(limit, offset)
  const limitPlaceholder = `$${values.length - 1}`
  const offsetPlaceholder = `$${values.length}`

  const [postsResult, countResult] = await Promise.all([
    pool.query(
      `${POST_SELECT}
       ${whereClause}
       ORDER BY posts.created_at DESC
       LIMIT ${limitPlaceholder} OFFSET ${offsetPlaceholder}`,
      values,
    ),
    pool.query(
      `SELECT COUNT(*) FROM posts ${whereClause}`,
      values.slice(0, conditions.length),
    ),
  ])

  const posts = postsResult.rows
  const totalPosts = parseInt(countResult.rows[0]?.count ?? '0', 10)

  return {
    posts,
    hasMore: totalPosts > offset + posts.length,
  }
}

export const getPostById = async (id: string): Promise<Post> => {
  const sql = `${POST_SELECT} WHERE posts.id = $1`
  const result = await pool.query(sql, [id])
  const post = result.rows[0]
  if (!post) {
    throw new AppError(404, 'Post not found')
  }
  return post
}

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const { latitude, longitude, ...rest } = data
  const dbData = {
    ...rest,
    geom: `POINT(${longitude} ${latitude})`,
  }
  const { columnsJoinStr, placeholdersJoinStr, valuesList } =
    buildQueryParts(dbData)
  const sql = `INSERT INTO posts (${columnsJoinStr}) VALUES (${placeholdersJoinStr}) RETURNING *`
  const result = await pool.query(sql, valuesList)
  if (!result.rows[0]) {
    throw new AppError(500, 'Failed to create post')
  }
  return result.rows[0]
}

export const updatePost = async (
  data: UpdatePostData,
  id: string,
): Promise<Post> => {
  const { latitude, longitude, ...rest } = data
  const dbData = {
    ...rest,
    geom: `POINT(${longitude} ${latitude})`,
  }
  const { setFieldsClause, valuesList } = buildQueryParts(dbData, 2)
  const sql = `UPDATE posts SET ${setFieldsClause} WHERE id = $1 RETURNING *`
  const result = await pool.query(sql, [id, ...valuesList])
  if (!result.rows[0]) {
    throw new AppError(404, 'Post not found')
  }
  return result.rows[0]
}

export const deletePost = async (id: string): Promise<void> => {
  const sql = 'DELETE FROM posts WHERE id = $1'
  const result = await pool.query(sql, [id])
  if (!result.rowCount) {
    throw new AppError(404, 'Post not found')
  }
}
