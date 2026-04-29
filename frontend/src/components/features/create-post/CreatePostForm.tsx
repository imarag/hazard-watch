import { HazardType } from '@/types/hazards'
import HazardMap from '@/components/features/map/HazardMap'
import useField from '@/hooks/useField'
import { useState } from 'react'
import { TextField, Button, MenuItem } from '@mui/material'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'
import type { Location } from '@/types/hazards'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import type { CreatePost } from '@/types/posts'
import { appRoutes } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormContainer from '@/components/ui/FormContainer'

export default function CreatePostForm() {
  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  const { showNotification, createNotification } = useNotification()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (post: CreatePost) => postsService.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      showNotification(
        createNotification('Post created successfully.', 'success'),
      )
      navigate(appRoutes.home.path)
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
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
    <FormContainer
      title='REPORT A HAZARD'
      onSubmit={handleSubmit}
      maxWidth='sm'
    >
      <TextField
        label='Title'
        size='small'
        value={title.value}
        onChange={title.onChange}
        required
      />
      <TextField
        size='small'
        label='Description'
        value={description.value}
        onChange={description.onChange}
        required
        multiline
        rows={3}
        disabled={isPending}
      />
      <TextField
        size='small'
        select
        value={hazardType.value}
        onChange={hazardType.onChange}
        label='Category'
        fullWidth
        disabled={isPending}
      >
        {Object.values(HazardType).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <HazardMap
        location={location}
        setLocation={setLocation}
        isLoading={isPending}
      />
      <Button
        disabled={!location || !title.value || !description.value || isPending}
        type='submit'
        variant='contained'
        fullWidth
      >
        {isPending ? 'Submitting...' : 'Report'}
      </Button>
    </FormContainer>
  )
}
