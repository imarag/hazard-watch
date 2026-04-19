import { Stack } from '@mui/material'
import type { Post } from '@/types/posts'
import UserPost from './UserPost'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'

interface PostsListProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function PostsList({ posts, setPosts }: PostsListProps) {
  const navigate = useNavigate()

  async function handleDeletePost(id: string) {
    await postsService.deletePost(id)
    setPosts((prev) => prev.filter((post) => post.id !== id))
    navigate('/')
  }

  return (
    <Stack direction='column' spacing={2}>
      {posts.map((post) => (
        <UserPost onDelete={handleDeletePost} key={post.id} post={post} />
      ))}
    </Stack>
  )
}
