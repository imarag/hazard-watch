import { useEffect, useState } from 'react'
import postsService from '@/services/posts'
import type { Post } from '@/types/posts'
import { Box } from '@mui/material'
import PostsList from '../features/posts/PostsList'
import PostsToolBar from '../features/posts/PostsToolBar'
import type { SortField, SortDirection } from '@/types/posts'
import { useMemo } from 'react'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortField === 'createdAt') {
        const aVal = new Date(a.createdAt).getTime()
        const bVal = new Date(b.createdAt).getTime()
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }

      const aVal = String(a[sortField]).toLowerCase()
      const bVal = String(b[sortField]).toLowerCase()
      const result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      return sortDir === 'asc' ? result : -result
    })
  }, [posts, sortField, sortDir])

  useEffect(() => {
    async function getPosts() {
      const res = await postsService.getAllPosts()
      setPosts(res)
    }
    getPosts()
  }, [])

  return (
    <Box>
      <PostsToolBar
        sortField={sortField}
        sortDir={sortDir}
        setSortDir={setSortDir}
        setSortField={setSortField}
        posts={posts}
      />
      <PostsList posts={sortedPosts} setPosts={setPosts} />
    </Box>
  )
}
