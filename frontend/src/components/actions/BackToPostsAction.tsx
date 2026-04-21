import { Button } from '@mui/material'
import { Link } from 'react-router'
import { appRoutes } from '@/constants/routes'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function BackToPostsAction() {
  return (
    <Button
      component={Link}
      to={appRoutes.home.path}
      startIcon={<ArrowBackIosIcon />}
      size='small'
      variant='outlined'
    >
      Back to posts
    </Button>
  )
}
