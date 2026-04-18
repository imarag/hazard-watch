import type { Post } from '@/types/posts'
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import usersService from '@/services/users'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useAuth } from '@/contexts/AuthContext'
import { formatCoordinates } from '@/utils/geometry'
import { hazardIconMapping } from '@/icons'

interface PostProps {
  post: Post
}

export default function UserPost({ post }: PostProps) {
  const { currentUser } = useAuth()
  const [author, setAuthor] = useState('')

  useEffect(() => {
    async function getUser() {
      const user = await usersService.getUserById(post.id)
      setAuthor(user.name)
    }
    getUser()
  }, [post.id])

  const Icon = hazardIconMapping[post.hazardType]
  return (
    <Card
      raised={false}
      variant='outlined'
      sx={{ backgroundColor: 'background.paper' }}
    >
      <CardHeader
        avatar={<Avatar>{author ? author[0].toUpperCase() : ''}</Avatar>}
        title={post.title}
        subheader={post.createdAt}
      />
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
        >
          {post.title}
          <Icon fontSize='small' />
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontWeight: 'fontWeightLight' }}
        >
          {post.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {formatCoordinates(
            post.location.geometry.coordinates[0],
            post.location.geometry.coordinates[1],
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton component={Link} to={`/posts/${post.id}`}>
          <VisibilityIcon fontSize='small' />
        </IconButton>
        {currentUser?.id === post.userId && (
          <>
            <IconButton component={Link} to={`/posts/${post.id}/edit`}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton>
              <DeleteIcon fontSize='small' color='error' />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  )
}
