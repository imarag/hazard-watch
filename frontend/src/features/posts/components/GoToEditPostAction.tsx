import EditIcon from '@mui/icons-material/Edit'
import ActionButton from '@/components/ui/ActionButton'
import { appRoutes } from '@/shared/constants/routes'
import { useCurrentUser, useIsUserLoggedIn } from '@/features/auth/store'
import type { Post } from '@/features/posts/types'

interface GoToEditPostActionProps {
  post: Post
}

export default function GoToEditPostAction({ post }: GoToEditPostActionProps) {
  const currentUser = useCurrentUser()
  const isUserLoggedIn = useIsUserLoggedIn()

  const isSameUser = isUserLoggedIn && currentUser?.id === post.author.id
  if (!isSameUser) {
    return null
  }

  return (
    <ActionButton
      to={appRoutes.editPost.path.replace(':id', post.id)}
      icon={EditIcon}
      label='Edit Post'
      variant='outlined'
      color='secondary'
    />
  )
}
