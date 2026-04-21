import { useNavigate, useParams } from 'react-router'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import postsService from '@/services/posts'

export default function DeletePostAction() {
  const { id } = useParams()
  const navigate = useNavigate()

  async function handleDeletePost() {
    if (!id) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this post?',
    )
    if (!confirmed) return
    await postsService.deletePost(id)
    navigate('/')
  }

  return (
    <Button
      endIcon={<DeleteIcon />}
      size='small'
      variant='outlined'
      onClick={handleDeletePost}
      color='error'
    >
      Delete Post
    </Button>
  )
}
