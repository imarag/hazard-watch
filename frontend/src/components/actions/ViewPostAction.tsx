import VisibilityIcon from '@mui/icons-material/Visibility'
import { appRoutes } from '@/constants/routes'
import ActionButton from '@/components/ui/ActionButton'

interface ViewPostActionProps {
  postId: string
}

export default function ViewPostAction({ postId }: ViewPostActionProps) {
  return (
    <ActionButton
      to={appRoutes.viewPost.path.replace(':id', postId)}
      icon={VisibilityIcon}
      label='View Post'
      variant='outlined'
      color='secondary'
    />
  )
}
