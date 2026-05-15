import AddIcon from '@mui/icons-material/Add'
import ActionButton from '@/components/ui/ActionButton'
import { appRoutes } from '@/constants/routes'
import { useIsUserLoggedIn } from '@/stores/auth'

export default function GoToCreatePostAction() {
  const isUserLoggedIn = useIsUserLoggedIn()

  if (!isUserLoggedIn) {
    return null
  }

  return (
    <ActionButton
      to={appRoutes.createPost.path}
      icon={AddIcon}
      label='Create Post'
      variant='contained'
    />
  )
}
