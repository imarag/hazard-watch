import { TextField, Button, MenuItem } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import type { Post } from '@/features/posts/types'
import useField from '@/hooks/useField'
import PostMap from '@/features/map/components/PostMap'
import FormContainer from '@/components/ui/FormContainer'
import { updatePost } from '@/features/posts/services'
import { useNotificationActions } from '@/shared/stores/notification'
import { appRoutes } from '@/shared/constants/routes'
import { getErrorMessage } from '@/features/auth/utils'
import { type HazardPosition, HazardType } from '@/features/layers/types'

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
  const hazardPosition = useField<HazardPosition | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (position: HazardPosition) =>
      updatePost(post.id, {
        title: title.value,
        description: description.value,
        hazardType: hazardType.value,
        longitude: position.longitude,
        latitude: position.latitude,
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

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!hazardPosition.value) {
      return
    }
    mutate(hazardPosition.value)
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
      <PostMap
        onLocationSelect={(longitude: number, latitude: number) =>
          hazardPosition.setValue({ longitude, latitude })
        }
        longitude={hazardPosition.value?.longitude}
        latitude={hazardPosition.value?.latitude}
        isLoading={isPending}
        flyToLocation={false}
        setHazardPosition={hazardPosition.setValue}
      />
      <Button
        disabled={
          !hazardPosition || !title.value || !description.value || isPending
        }
        type='submit'
        variant='contained'
        fullWidth
      >
        {isPending ? 'Updating...' : 'Update report'}
      </Button>
    </FormContainer>
  )
}
