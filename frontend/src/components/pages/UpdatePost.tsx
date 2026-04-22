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
import { appRoutes } from '@/constants/routes'
import PageLayout from '../layouts/PageLayout'
import useField from '@/hooks/useField'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function UpdatePost() {
  const { showNotification, createNotification } = useNotification()
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { setValue: titleSetValue, ...title } = useField('')
  const { setValue: descriptionSetValue, ...description } = useField('')
  const { setValue: hazardTypeSetValue, ...hazardType } =
    useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  // No field objects in deps — only `id` changes should re-run this
  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const post = await postsService.getPostById(id)
      titleSetValue(post.title)
      descriptionSetValue(post.description)
      hazardTypeSetValue(post.hazardType)
      setLocation(post.location)
    }
    fetchPost()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: ({
      data,
      postId,
    }: {
      data: Parameters<typeof postsService.updatePost>[0]
      postId: string
    }) => postsService.updatePost(data, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      showNotification(
        createNotification('Post updated successfully.', 'success'),
      )
      navigate('/')
    },
    onError: (error: unknown) => {
      let errorMessage = 'Something went wrong'
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message ?? errorMessage
      }
      showNotification(
        createNotification(`Cannot update post: ${errorMessage}`, 'error'),
      )
    },
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!location || !id) return
    const confirmedLocation = location
    updatePost({
      data: {
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        location: confirmedLocation,
      },
      postId: id,
    })
  }

  return (
    <PageLayout pageTitle={appRoutes.editPost.pageTitle}>
      <Container
        maxWidth='sm'
        sx={{ mt: 4, backgroundColor: 'background.paper', paddingBlock: 4 }}
      >
        <Stack component='form' onSubmit={handleSubmit} spacing={2}>
          <Title>Update report</Title>
          <TextField label='Title' size='small' {...title} required />
          <TextField
            label='Description'
            size='small'
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
            disabled={
              !location || !title.value || !description.value || isPending
            }
            type='submit'
            variant='contained'
            fullWidth
          >
            {isPending ? 'Updating...' : 'Update report'}
          </Button>
        </Stack>
      </Container>
    </PageLayout>
  )
}
