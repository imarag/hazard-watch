import { Button } from '@mui/material'
import { Link } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import { appRoutes } from '@/constants/routes'

export default function CreatePostAction() {
  return (
    <Button
      component={Link}
      to={appRoutes.createPost.path}
      endIcon={<AddIcon />}
      size='small'
      variant='contained'
    >
      Create Post
    </Button>
  )
}
