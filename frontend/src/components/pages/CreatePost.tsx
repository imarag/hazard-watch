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
import type { CreatePost } from '@/types/posts'
import { appRoutes } from '@/constants/routes'
import PageLayout from '../layouts/PageLayout'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CreatePost() {
  const { showNotification, createNotification } = useNotification()
  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (post: CreatePost) => postsService.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showNotification(
        createNotification('Post created successfully.', 'success'),
      )
      navigate('/')
    },
    onError: (error: unknown) => {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot create post: ${errorMessage}`, 'error'),
      )
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!location) return
    mutate({
      title: title.value,
      description: description.value,
      hazardType: hazardType.value,
      location,
    })
  }

  return (
    <PageLayout pageTitle={appRoutes.createPost.pageTitle}>
      <Container
        maxWidth='sm'
        sx={{
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
            value={description.value}
            onChange={description.onChange}
            required
            multiline
            rows={3}
          />
          <TextField
            size='small'
            select
            value={hazardType.value}
            onChange={hazardType.onChange}
            label='Category'
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
            disabled={
              !location || !title.value || !description.value || isPending
            }
            type='submit'
            variant='contained'
            fullWidth
          >
            {isPending ? 'Submitting...' : 'Report'}
          </Button>
        </Stack>
      </Container>
    </PageLayout>
  )
}
