import { TextField, Button, MenuItem } from '@mui/material'
import { HazardType } from '@/types/hazards'
import { useState } from 'react'
import useField from '@/hooks/useField'
import HazardMap from '@/components/features/map/HazardMap'
import type { Location } from '@/types/hazards'
import FormContainer from '@/components/ui/FormContainer'
import { getErrorMessage } from '@/utils/auth'
import { appRoutes } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postsService from '@/services/posts'
import { useNotification } from '@/contexts/NotificationContext'
import { useNavigate } from 'react-router'
import type { Post } from '@/types/posts'

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const { showNotification, createNotification } = useNotification()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const title = useField(post.title)
  const description = useField(post.description)
  const hazardType = useField<HazardType>(post.hazardType)
  const [location, setLocation] = useState<Location | null>(post.location)

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      postsService.updatePost(
        {
          title: title.value,
          description: description.value,
          hazardType: hazardType.value,
          location: location!,
        },
        post.id,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', post.id] })
      showNotification(
        createNotification('Post updated successfully.', 'success'),
      )
      navigate(appRoutes.viewPost.path.replace(':id', post.id))
    },
    onError: (error: unknown) => {
      showNotification(
        createNotification(
          `Cannot update post: ${getErrorMessage(error)}`,
          'error',
        ),
      )
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!location) return
    mutate()
  }

  return (
    <FormContainer title='UPDATE POST' onSubmit={handleSubmit} maxWidth='sm'>
      <TextField
        label='Title'
        size='small'
        value={title.value}
        onChange={title.onChange}
        disabled={isPending}
        required
      />
      <TextField
        label='Description'
        size='small'
        value={description.value}
        onChange={description.onChange}
        required
        disabled={isPending}
        multiline
        rows={3}
      />
      <TextField
        size='small'
        select
        label='Category'
        disabled={isPending}
        value={hazardType.value}
        onChange={hazardType.onChange}
        fullWidth
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
        {isPending ? 'Updating...' : 'Update report'}
      </Button>
    </FormContainer>
  )
}
