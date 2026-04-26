import type { Post } from '@/types/posts'
import type { SortField, SortDirection } from '@/types/posts'

export function sortPosts(
  posts: Post[],
  sortField: SortField,
  sortDir: SortDirection,
) {
  return [...posts].sort((a, b) => {
    if (sortField === 'createdAt') {
      const aVal = new Date(a.createdAt).getTime()
      const bVal = new Date(b.createdAt).getTime()
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    }
    if (sortField === 'author') {
      const aVal = String(a['user']['name']).toLowerCase()
      const bVal = String(b['user']['name']).toLowerCase()
      const result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      return sortDir === 'asc' ? result : -result
    }
    const aVal = String(a[sortField]).toLowerCase()
    const bVal = String(b[sortField]).toLowerCase()
    const result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    return sortDir === 'asc' ? result : -result
  })
}
