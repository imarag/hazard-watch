import type { Post } from '@/types/posts'
import {
  Card,
  CardHeader,
  Button,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Box,
} from '@mui/material'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import usersService from '@/services/users'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { formatCoordinates } from '@/utils/geometry'
import { hazardIconMapping } from '@/icons'
import { formatDate } from '@/utils/typography'
import type { UserPublic } from '@/types/users'
import EditPostAction from '@/components/actions/EditPostAction'
import DeletePostAction from '@/components/actions/DeletePostAction'
import postsService from '@/services/posts'
import ViewPostAction from '@/components/actions/ViewPostAction'

interface PostProps {
  post: Post
}

export default function UserPost({ post }: PostProps) {
  const { currentUser } = useAuth()
  const [user, setUser] = useState<UserPublic | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function getUser() {
      const user = await usersService.getUserById(post.userId)
      setUser(user)
    }
    getUser()
  }, [post.userId])

  async function handleDeletePost(id: string) {
    await postsService.deletePost(id)
    navigate('/')
  }

  const Icon = hazardIconMapping[post.hazardType]

  return (
    <Card
      variant='outlined'
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderRadius: 4,
        padding: 2,
        transition: 'border-color 0.15s',
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.dark',
              color: 'secondary.contrastText',
              width: 40,
              height: 40,
              fontSize: 'h6',
              fontWeight: 500,
            }}
          >
            {user ? user.name[0].toUpperCase() : ''}
          </Avatar>
        }
        title={
          <Typography
            sx={{
              fontSize: 'body1',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {post.title}
          </Typography>
        }
        subheader={
          <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
            {formatDate(post.createdAt)}
          </Typography>
        }
      />

      <CardContent sx={{ pt: 0, pb: 0 }}>
        <Typography
          variant='h6'
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: 'body2',
            fontWeight: 'fontWeightLight',
            color: 'text.primary',
            textTransform: 'capitalize',
          }}
        >
          {post.hazardType}
          <Icon fontSize='small' sx={{ color: 'text.secondary' }} />
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            fontWeight: 'light',
            mb: 0.5,
          }}
        >
          {post.description}
        </Typography>

        <Typography
          variant='body2'
          sx={{
            color: 'text.disabled',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          {formatCoordinates(
            post.location.geometry.coordinates[0],
            post.location.geometry.coordinates[1],
          )}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0.5, pb: 0.5, mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ViewPostAction postId={post.id} />
          {currentUser?.id === post.userId && (
            <>
              <EditPostAction postId={post.id} />
              <DeletePostAction
                postId={post.id}
                onDeletePost={handleDeletePost}
              />
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}
