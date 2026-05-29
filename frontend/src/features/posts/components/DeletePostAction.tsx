import DeleteIcon from '@mui/icons-material/Delete'
import ActionButton from '@/components/ui/ActionButton'
import { getErrorMessage } from '@/features/auth/utils'
import { appRoutes } from '@/shared/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '@/features/posts/services'
import { useNavigate } from 'react-router'
import { useCurrentUser, useIsUserLoggedIn } from '@/features/auth/store'
import type { Post } from '@/features/posts/types'
import { useNotificationActions } from '@/shared/stores/notification'

interface DeletePostActionProps {
  post: Post
}

export default function DeletePostAction({ post }: DeletePostActionProps) {
  const { showNotification, createNotification } = useNotificationActions()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const isUserLoggedIn = useIsUserLoggedIn()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePost(post.id),
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
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }
    mutate()
  }

  const isSameUser = isUserLoggedIn && currentUser?.id === post.author.id
  if (!isSameUser) {
    return null
  }

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
