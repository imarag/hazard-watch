export const buildQueryParts = (data: Record<string, unknown>, startAt = 1) => {
  const keys = Object.keys(data)
  const valuesList = Object.values(data)
  const columnsJoinStr = keys.join(', ')
  const placeholdersJoinStr = keys.map((_, i) => `$${i + startAt}`).join(', ')
  const setFieldsClause = keys.map((k, i) => `${k} = $${i + startAt}`).join(', ')
  return { columnsJoinStr, placeholdersJoinStr, setFieldsClause, valuesList }
}

// Returns an ISO string for a date N days before today
export function datesBefore(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export function getToday() {
  return new Date().toISOString()
}
