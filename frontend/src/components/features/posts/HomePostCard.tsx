import type { Post } from '@/types/posts'
import { Card, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import usersService from '@/services/users'
import type { UserPublic } from '@/types/users'
import HomePostCardActions from '@/components/features/posts/HomePostCardActions'
import HomePostCardBody from '@/components/features/posts/HomePostCardBody'
import HomePostCardTitle from '@/components/features/posts/HomePostCardTitle'

interface PostProps {
  post: Post
}

export default function HomePostCard({ post }: PostProps) {
  const [user, setUser] = useState<UserPublic | null>(null)

  useEffect(() => {
    async function getUser() {
      const user = await usersService.getUserById(post.userId)
      setUser(user)
    }
    getUser()
  }, [post.userId])

  return (
    <Card
      variant='outlined'
      sx={{
        borderColor: 'divider',
        borderRadius: 4,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <HomePostCardTitle user={user} post={post} />{' '}
      <Divider sx={{ borderColor: 'divider' }} />
      <HomePostCardBody post={post} />
      <HomePostCardActions post={post} />
    </Card>
  )
}
