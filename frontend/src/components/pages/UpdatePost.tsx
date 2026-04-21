import { TextField, Button, Stack, Container, MenuItem } from '@mui/material'
import { useParams, useNavigate } from 'react-router'
import postsService from '@/services/posts'
import { useEffect, useState } from 'react'
import Title from '@/components/ui/Title'
import type { Location } from '@/types/hazards'
import { HazardType } from '@/types/hazards'
import HazardMap from '../features/HazardMap'
import { useNotification } from '@/contexts/NotificationContext'
import axios from 'axios'

export default function UpdatePost() {
  const { showNotification, createNotification } = useNotification()
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hazardType, setHazardType] = useState<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const post = await postsService.getPostById(id)
      setTitle(post.title)
      setDescription(post.description)
      setHazardType(post.hazardType)
      setLocation(post.location)
    }
    fetchPost()
  }, [id])

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!location || !id) return
    try {
      await postsService.updatePost(
        { title, description, hazardType, location },
        id,
      )
      showNotification(
        createNotification('Post updated succesfully.', 'success'),
      )
      navigate('/')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot create post: ${errorMessage}`, 'error'),
      )
    }
  }

  return (
    <Container
      maxWidth='sm'
      sx={{ mt: 4, backgroundColor: 'background.paper', paddingBlock: 4 }}
    >
      <Stack component='form' onSubmit={handleSubmit} spacing={2}>
        <Title>Update report</Title>
        <TextField
          label='Title'
          size='small'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label='Description'
          size='small'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={3}
        />
        <TextField
          size='small'
          select
          label='Category'
          value={hazardType}
          onChange={(e) => setHazardType(e.target.value as HazardType)}
          fullWidth
        >
          {Object.values(HazardType).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <HazardMap location={location} setLocation={setLocation} />
        <Button
          disabled={!location || !title || !description}
          type='submit'
          variant='contained'
          fullWidth
        >
          Update report
        </Button>
      </Stack>
    </Container>
  )
}
