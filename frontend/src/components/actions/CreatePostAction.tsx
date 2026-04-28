import AddIcon from '@mui/icons-material/Add'
import { appRoutes } from '@/constants/routes'
import ActionButton from '@/components/ui/ActionButton'

export default function CreatePostAction() {
  return (
    <ActionButton
      to={appRoutes.createPost.path}
      icon={AddIcon}
      label='Create Post'
      variant='contained'
    />
  )
}
