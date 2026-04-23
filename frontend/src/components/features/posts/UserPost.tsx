import type { Post } from '@/types/posts'
import {
  Card,
  Stack,
  Chip,
  Avatar,
  Typography,
  Box,
  Divider,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import RoomIcon from '@mui/icons-material/Room'
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
import { useNotification } from '@/contexts/NotificationContext'

function PostCardTitle({
  user,
  post,
}: {
  user: UserPublic | null
  post: Post
}) {
  const Icon = hazardIconMapping[post.hazardType]
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary',
            color: 'secondary.contrastText',
            width: 40,
            height: 40,
            fontSize: 'h6',
          }}
        >
          {user ? user.name[0].toUpperCase() : ''}
        </Avatar>
        <Stack direction='column'>
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
            }}
          >
            {post.userName}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            {formatDate(post.createdAt)}
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Chip
          label={post.hazardType}
          icon={<Icon style={{ fontSize: 14 }} />}
          color='primary'
          size='small'
        />
      </Box>
    </Box>
  )
}

function PostCardBody({ post }: { post: Post }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant='body2'
        gutterBottom
        sx={{
          fontWeight: 'fontWeightBold',
          color: 'text.primary',
          textTransform: 'capitalize',
        }}
      >
        {post.title}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          fontWeight: 'fontWeightLight',
        }}
      >
        {post.description}
      </Typography>
      <Typography
        variant='caption'
        sx={{
          color: 'text.disabled',
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <RoomIcon style={{ fontSize: 14 }} />
        {formatCoordinates(
          post.location.geometry.coordinates[0],
          post.location.geometry.coordinates[1],
        )}
      </Typography>
    </Stack>
  )
}

function PostCardActions({ post }: { post: Post }) {
  const { currentUser } = useAuth()
  const { createNotification, showNotification } = useNotification()
  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      return await postsService.deletePost(postId)
    },
    onSuccess: () => {
      showNotification(
        createNotification('Post deleted succesfully.', 'success'),
      )
      navigate('/')
    },
    onError: (error: unknown) => {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot delete the post: ${errorMessage}`, 'error'),
      )
    },
  })

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ViewPostAction postId={post.id} />
      {currentUser?.id === post.userId && (
        <>
          <EditPostAction postId={post.id} />
          <Box sx={{ marginLeft: 'auto' }}>
            <DeletePostAction
              postId={post.id}
              loading={deleteMutation.isPending}
              onDeletePost={async () => deleteMutation.mutate(post.id)}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

interface PostProps {
  post: Post
}

export default function UserPost({ post }: PostProps) {
  const [user, setUser] = useState<UserPublic | null>(null)

  useEffect(() => {
    async function getUser() {
      const user = await usersService.getUserById(post.userId)
      setUser(user)
    }
    getUser()
  }, [post.userId])

  return (
    <Card
      variant='outlined'
      sx={{
        borderColor: 'divider',
        borderRadius: 4,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PostCardTitle user={user} post={post} />{' '}
      <Divider sx={{ borderColor: 'divider' }} />
      <PostCardBody post={post} />
      <PostCardActions post={post} />
    </Card>
  )
}
