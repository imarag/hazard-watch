import EditIcon from '@mui/icons-material/Edit'
import ActionButton from '@/components/ui/ActionButton'
import { appRoutes } from '@/constants/routes'
import { useCurrentUser, useIsUserLoggedIn } from '@/stores/auth'

import type { Post } from '@/types/posts'

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
