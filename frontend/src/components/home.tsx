import { useEffect, useState } from 'react'
import postsService from '../services/posts'
import type { Post } from '@/types/posts'
import UserPost from './features/posts/UserPost'
import { Stack } from '@mui/material'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    async function getPosts() {
      const res = await postsService.getAllPosts()
      setPosts(res)
    }
    getPosts()
  }, [])
  return (
    <div>
      <Stack
        direction='column'
        spacing={2}
        sx={{ marginInline: 4, marginBlock: 4 }}
      >
        {posts.map((post) => (
          <UserPost post={post} />
        ))}
      </Stack>
    </div>
  )
}
