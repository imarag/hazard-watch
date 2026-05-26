import { TextField, Button, MenuItem } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { HazardType } from '@/types/hazards'
import type { Post } from '@/types/posts'
import useField from '@/hooks/useField'
import HazardMap from '@/features/map/components/HazardMap'
import FormContainer from '@/components/ui/FormContainer'
import postsService from '@/services/posts'
import { useNotificationActions } from '@/stores/notification'
import { appRoutes } from '@/constants/routes'
import { getErrorMessage } from '@/utils/auth'

interface EditPostFormProps {
  post: Post
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const { showNotification, createNotification } = useNotificationActions()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const title = useField(post.title)
  const description = useField(post.description)
  const hazardType = useField<HazardType>(post.hazardType)
  const hazardLongitude = useField(post.longitude)
  const hazardLatitude = useField(post.latitude)

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      postsService.updatePost(post.id, {
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        longitude: hazardLongitude.value,
        latitude: hazardLatitude.value,
      }),
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

  const hasLocation =
    hazardLongitude.value != null && hazardLatitude.value != null
  const canSubmit =
    hasLocation && !!title.value && !!description.value && !isPending

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSubmit) {
      return
    }
    mutate()
  }

  function handleLocationSelect(longitude: number, latitude: number) {
    hazardLongitude.setValue(longitude)
    hazardLatitude.setValue(latitude)
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
        onLocationSelect={handleLocationSelect}
        longitude={hazardLongitude.value}
        latitude={hazardLatitude.value}
        isLoading={isPending}
        flyToLocation={false}
      />
      <Button disabled={!canSubmit} type='submit' variant='contained' fullWidth>
        {isPending ? 'Updating...' : 'Update report'}
      </Button>
    </FormContainer>
  )
}
