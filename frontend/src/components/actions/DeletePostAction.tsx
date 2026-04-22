import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface DeletePostActionProps {
  onDeletePost: (id: string) => Promise<void>
  postId: string
}

export default function DeletePostAction({
  onDeletePost,
  postId,
}: DeletePostActionProps) {
  async function handleClickDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?',
    )
    if (!confirmed) return
    await onDeletePost(postId)
  }

  return (
    <Button
      onClick={handleClickDelete}
      startIcon={<DeleteIcon />}
      size='small'
      color='error'
      variant='outlined'
    >
      Delete post
    </Button>
  )
}
