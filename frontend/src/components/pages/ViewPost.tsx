import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
} from '@mui/material'
import axios from 'axios'
import { useNotification } from '@/contexts/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import type { SvgIconComponent } from '@mui/icons-material'
import { useParams } from 'react-router'
import { useCallback } from 'react'
import postsService from '@/services/posts'
import { useAuth } from '@/contexts/AuthContext'
import Map from '../features/Map'
import { hazardIconMapping } from '@/icons'
import { formatDate } from '@/utils/typography'
import { useNavigate } from 'react-router'
import { appRoutes } from '@/constants/routes'
import PageLayout from '../layouts/PageLayout'
import EditPostAction from '../actions/EditPostAction'
import DeletePostAction from '../actions/DeletePostAction'
import MapMarker from '../features/map/MapMarker'
import FlyToLocation from '../features/map/FlyToLocation'
import type { Post } from '@/types/posts'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography
        variant='caption'
        sx={{
          fontWeight: 500,
          color: 'text.disabled',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  )
}

function FieldText({
  text,
  icon: Icon = null,
}: {
  text: string
  icon?: SvgIconComponent | null
}) {
  return (
    <Typography
      variant='body2'
      sx={{
        color: 'text.primary',
        fontWeight: 300,
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      {text}
      {Icon && (
        <Icon
          fontSize='small'
          sx={{ color: 'text.secondary', width: 16, height: 16 }}
        />
      )}
    </Typography>
  )
}

function ViewMap({ lat, lon }: { lat: number; lon: number }) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.25,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          variant='caption'
          sx={{
            fontWeight: 500,
            color: 'text.disabled',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
          }}
        >
          Location
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Map height='100%'>
          <FlyToLocation lat={lat} lon={lon} />
          <MapMarker lat={lat} lon={lon} />
        </Map>
      </Box>
    </Box>
  )
}

function ViewInfo({
  post,
  lat,
  lon,
}: {
  post: Post
  lat: number
  lon: number
}) {
  const Icon = hazardIconMapping[post.hazardType]
  return (
    <Card
      variant='outlined'
      sx={{
        borderColor: 'divider',
        height: '100%',
        borderRadius: 4,
        bgcolor: 'background.paper',
      }}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, p: 3 }}
      >
        {/* Title + hazard badge */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Typography
            variant='h5'
            sx={{
              flex: 1,
              fontWeight: 500,
              color: 'text.primary',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>
          <Chip
            label={post.hazardType}
            icon={<Icon style={{ fontSize: 14 }} />}
            size='small'
            sx={{
              textTransform: 'capitalize',
              bgcolor: 'error.dark',
              color: 'error.contrastText',
              fontWeight: 500,
              fontSize: 12,
              '& .MuiChip-icon': { color: 'error.contrastText' },
            }}
          />
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        <Field label='Description'>
          <FieldText text={post.description} />
        </Field>

        <Field label='Hazard type'>
          <FieldText
            text={post.hazardType}
            icon={hazardIconMapping[post.hazardType]}
          />
        </Field>

        <Field label='Coordinates'>
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              fontFamily: 'monospace',
              fontSize: 12,
            }}
          >
            {lat.toFixed(4)}° N, {Math.abs(lon).toFixed(4)}°{' '}
            {lon < 0 ? 'W' : 'E'}
          </Typography>
        </Field>

        <Field label='Report creation date'>
          <FieldText text={formatDate(post.createdAt)} />
        </Field>
      </CardContent>
    </Card>
  )
}

export default function ViewPost() {
  const { createNotification, showNotification } = useNotification()
  const navigate = useNavigate()
  const { id: postId } = useParams()
  const { currentUser, isUserLoggedIn } = useAuth()

  const { data: post, isLoading } = useQuery({
    queryKey: ['post'],
    initialData: null,
    enabled: !!postId,
    queryFn: () => postsService.getPostById(postId!),
    onError: (error: unknown) => {
      let errorMessage = 'Something went wrong'

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot fetch the post: ${errorMessage}`, 'error'),
      )
    },
  })

  const handleDeletePost = useCallback(async () => {
    if (!post) return
    try {
      await postsService.deletePost(post.id)
      showNotification(
        createNotification('Post deleted succesfully.', 'success'),
      )
      navigate('/')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot update post: ${errorMessage}`, 'error'),
      )
    }
  }, [navigate, post, showNotification, createNotification])

  if (!post) return null

  const lat = post.location.geometry.coordinates[1]
  const lon = post.location.geometry.coordinates[0]
  const isSameUser = post?.userId === currentUser?.id
  const Action =
    isSameUser && isUserLoggedIn ? (
      <>
        <EditPostAction postId={post.id} />
        <DeletePostAction postId={post.id} onDeletePost={handleDeletePost} />
      </>
    ) : null

  return (
    <PageLayout pageTitle={appRoutes.viewPost.pageTitle} actions={Action}>
      {isLoading ? (
        <Typography>Fething the post</Typography>
      ) : (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ height: '100%' }}
        >
          <Grid size={4}>
            <ViewInfo post={post} lat={lat} lon={lon} />
          </Grid>
          <Grid size={8}>
            <ViewMap lat={lat} lon={lon} />
          </Grid>
        </Grid>
      )}
    </PageLayout>
  )
}
