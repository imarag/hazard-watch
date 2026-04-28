import DeleteIcon from '@mui/icons-material/Delete'
import ActionButton from '@/components/ui/ActionButton'

interface DeletePostActionProps {
  onDeletePost: (id: string) => Promise<void>
  postId: string
  loading: boolean
}

export default function DeletePostAction({
  onDeletePost,
  postId,
  loading,
}: DeletePostActionProps) {
  async function handleClickDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?',
    )
    if (!confirmed) return
    await onDeletePost(postId)
  }

  return (
    <ActionButton
      onClick={handleClickDelete}
      loading={loading}
      icon={DeleteIcon}
      label='Delete Post'
      variant='outlined'
      color='error'
    />
  )
}
