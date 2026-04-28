import EditIcon from '@mui/icons-material/Edit'
import { appRoutes } from '@/constants/routes'
import ActionButton from '@/components/ui/ActionButton'

interface EditPostActionProps {
  postId: string
}

export default function EditPostAction({ postId }: EditPostActionProps) {
  return (
    <ActionButton
      to={appRoutes.editPost.path.replace(':id', postId)}
      icon={EditIcon}
      label='Edit Post'
      variant='outlined'
      color='secondary'
    />
  )
}
