import { Button } from '@mui/material'
import { Link } from 'react-router'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { appRoutes } from '@/constants/routes'

interface ViewPostActionProps {
  postId: string
}

export default function ViewPostAction({ postId }: ViewPostActionProps) {
  return (
    <Button
      component={Link}
      to={appRoutes.viewPost.path.replace(':id', postId)}
      size='small'
      variant='outlined'
      startIcon={<VisibilityIcon fontSize='small' />}
      color='secondary'
    >
      View
    </Button>
  )
}
