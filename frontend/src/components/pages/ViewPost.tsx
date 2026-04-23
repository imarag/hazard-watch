import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
} from '@mui/material'
import axios from 'axios'
import { useNotification } from '@/contexts/NotificationContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { SvgIconComponent } from '@mui/icons-material'
import { useParams } from 'react-router'
import { formatCoordinates } from '@/utils/geometry'
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
import type { HazardType } from '@/types/hazards'

function FieldTitle({ label }: { label: string }) {
  return (
    <Typography
      variant='body1'
      sx={{
        color: 'text.disabled',
        fontWeight: 'fontWeightBold',
      }}
    >
      {label}
    </Typography>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <FieldTitle label={label} />
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
      variant='body1'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      {text}
      {Icon && <Icon fontSize='small' />}
    </Typography>
  )
}

function ViewInfoTitle({
  title,
  hazardType,
}: {
  title: string
  hazardType: HazardType
}) {
  const Icon = hazardIconMapping[hazardType]
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: 'fontWeightBold',
        }}
      >
        {title}
      </Typography>
      <Chip
        label={hazardType}
        icon={<Icon style={{ fontSize: 14 }} />}
        color='primary'
        size='small'
      />
    </Box>
  )
}

function ViewInfoBody({
  post,
  lon,
  lat,
}: {
  post: Post
  lon: number
  lat: number
}) {
  return (
    <Stack spacing={2}>
      <Field label='Description'>
        <FieldText text={post.description} />
      </Field>
      <Field label='Author'>
        <FieldText text={post.userName} />
      </Field>
      <Field label='Hazard type'>
        <FieldText
          text={post.hazardType}
          icon={hazardIconMapping[post.hazardType]}
        />
      </Field>
      <Field label='Coordinates'>
        <FieldText text={formatCoordinates(lon, lat)} />
      </Field>
      <Field label='Report creation date'>
        <FieldText text={formatDate(post.createdAt)} />
      </Field>
    </Stack>
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
        <FieldTitle label={'Location'} />
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
  return (
    <Card variant='outlined' sx={{ height: '100%', borderRadius: 4 }}>
      <CardContent sx={{ padding: 4 }}>
        <ViewInfoTitle title={post.title} hazardType={post.hazardType} />
        <Divider sx={{ borderColor: 'divider', marginBlock: 2 }} />
        <ViewInfoBody post={post} lon={lon} lat={lat} />
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

  if (!post) return null

  const lat = post.location.geometry.coordinates[1]
  const lon = post.location.geometry.coordinates[0]
  const isSameUser = post?.userId === currentUser?.id
  const Action =
    isSameUser && isUserLoggedIn ? (
      <>
        <EditPostAction postId={post.id} />
        <DeletePostAction
          postId={post.id}
          loading={deleteMutation.isPending}
          onDeletePost={async () => deleteMutation.mutate(post.id)}
        />
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
