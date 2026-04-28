import { Button } from '@mui/material'
import { Link } from 'react-router'
import HomeIcon from '@mui/icons-material/Home'
import { appRoutes } from '@/constants/routes'

export default function BackToHome() {
  return (
    <Button
      component={Link}
      to={appRoutes.home.path}
      startIcon={<HomeIcon />}
      size='small'
      variant='contained'
    >
      Back to posts
    </Button>
  )
}
