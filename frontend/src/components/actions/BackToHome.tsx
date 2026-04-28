import HomeIcon from '@mui/icons-material/Home'
import { appRoutes } from '@/constants/routes'
import ActionButton from '@/components/ui/ActionButton'

export default function BackToHome() {
  return (
    <ActionButton
      to={appRoutes.home.path}
      icon={HomeIcon}
      label='Back to posts'
      variant='contained'
    />
  )
}
