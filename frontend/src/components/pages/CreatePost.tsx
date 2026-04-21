import { TextField, Button, Stack, Container, MenuItem } from '@mui/material'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'
import { useState } from 'react'
import Title from '@/components/ui/Title'
import type { Location } from '@/types/hazards'
import { HazardType } from '@/types/hazards'
import HazardMap from '../features/HazardMap'
import { useNotification } from '@/contexts/NotificationContext'
import axios from 'axios'

export default function CreatePost() {
  const { showNotification, createNotification } = useNotification()
  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!location) {
      return
    }

    try {
      await postsService.createPost({
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        location: location,
      })
      showNotification(
        createNotification('Post created succesfully.', 'success'),
      )
      navigate('/')
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification({
        message: `Cannot create post: ${errorMessage}`,
        type: 'error',
      })
    }
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        mt: 4,
        backgroundColor: 'background.paper',
        paddingBlock: 4,
      }}
    >
      <Stack component='form' onSubmit={handleSubmit} spacing={2}>
        <Title>REPORT A HAZARD</Title>
        <TextField label='Title' size='small' {...title} required />
        <TextField
          size='small'
          label='Description'
          {...description}
          required
          multiline
          rows={3}
        />
        <TextField
          size='small'
          select
          label='Category'
          {...hazardType}
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
          disabled={!location || !title.value || !description.value}
          type='submit'
          variant='contained'
          fullWidth
        >
          Report
        </Button>
      </Stack>
    </Container>
  )
}
