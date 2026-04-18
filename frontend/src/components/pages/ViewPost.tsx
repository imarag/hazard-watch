import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { Marker, useMap } from 'react-leaflet'
import type { Post } from '@/types/posts'
import { Link, useParams } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'
import postsService from '@/services/posts'
import { useAuth } from '@/contexts/AuthContext'
import Map from '../features/Map'
import { hazardIconMapping } from '@/icons'

function LocationMarker({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()

  useEffect(() => {
    if (lat === undefined || lon === undefined) return
    map.flyTo([lat, lon], map.getZoom())
  }, [lat, lon, map])

  if (lat === undefined || lon === undefined) return null

  return <Marker position={[lat, lon]} />
}

function PostInfo({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box>
      <Typography
        variant='body2'
        sx={{ fontWeight: 'fontWeightBold', marginBottom: 0.5 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function PostInfoText({
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
        fontWeight: 'fontWeightLight',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {text}
      {Icon && <Icon fontSize='small' />}
    </Typography>
  )
}

export default function ViewPost() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const post = await postsService.getPostById(id)
      setPost(post)
    }
    fetchPost()
  }, [id])

  if (!post) {
    return null
  }

  async function handleDelete() {
    if (!id) return
    await postsService.deletePost(id)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Typography variant='h5' component='div'>
          {post.title}
        </Typography>
        <PostInfo title='Description'>
          <PostInfoText text={post.description} />
        </PostInfo>
        <PostInfo title='Hazard Type'>
          <PostInfoText
            text={post.hazardType}
            icon={hazardIconMapping[post.hazardType]}
          />
        </PostInfo>
        <PostInfo title='Location'>
          <Map>
            <LocationMarker
              lat={post.location.geometry.coordinates[1]}
              lon={post.location.geometry.coordinates[0]}
            />
          </Map>
        </PostInfo>
      </CardContent>
      <CardActions>
        {post.userId === currentUser?.id && (
          <>
            <Button
              component={Link}
              to={`/posts/${id}/edit`}
              startIcon={<EditIcon />}
              size='small'
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              size='small'
              color='error'
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}
