import DeleteIcon from '@mui/icons-material/Delete'
import ActionButton from '@/components/ui/ActionButton'
import { getErrorMessage } from '@/utils/auth'
import { appRoutes } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postsService from '@/services/posts'
import { useNotification } from '@/contexts/NotificationContext'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import type { Post } from '@/types/posts'

interface DeletePostActionProps {
  post: Post
}

export default function DeletePostAction({ post }: DeletePostActionProps) {
  const { showNotification, createNotification } = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { currentUser, isUserLoggedIn } = useAuth()

  const { mutate, isPending } = useMutation({
    mutationFn: () => postsService.deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate(appRoutes.home.path)
      showNotification(
        createNotification('Post deleted successfully.', 'success'),
      )
    },
    onError: (error: unknown) => {
      showNotification(
        createNotification(
          `Cannot delete post: ${getErrorMessage(error)}`,
          'error',
        ),
      )
    },
  })

  function handleClickDelete() {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    mutate()
  }

  const isSameUser = isUserLoggedIn && currentUser?.id === post.user.id
  if (!isSameUser) return null

  return (
    <ActionButton
      onClick={handleClickDelete}
      loading={isPending}
      icon={DeleteIcon}
      label='Delete Post'
      variant='outlined'
      color='error'
    />
  )
}
