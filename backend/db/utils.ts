import { camelToSnakeCase } from '../lib/utils.js'

export const buildQueryParts = (data: Record<string, unknown>, startAt = 1) => {
  const keys = Object.keys(data).map(camelToSnakeCase)
  const valuesList = Object.values(data)
  const columnsJoinStr = keys.join(', ')
  const placeholdersJoinStr = keys.map((_, i) => `$${i + startAt}`).join(', ')
  const setFieldsClause = keys
    .map((k, i) => `${k} = $${i + startAt}`)
    .join(', ')
  return { columnsJoinStr, placeholdersJoinStr, setFieldsClause, valuesList }
}


