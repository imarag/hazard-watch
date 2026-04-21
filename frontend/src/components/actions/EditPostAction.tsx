import { Button } from '@mui/material'
import { Link } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import { appRoutes } from '@/constants/routes'
import { useParams } from 'react-router'

export default function EditPostAction() {
  const { id } = useParams()
  return (
    <Button
      component={Link}
      to={appRoutes.editPost.path.replace(':id', id)}
      endIcon={<EditIcon />}
      size='small'
      variant='outlined'
    >
      Edit Post
    </Button>
  )
}
