import { HazardType } from '@/features/layers/types'
import PostMap from '@/features/map/components/PostMap'
import useField from '@/hooks/useField'
import { TextField, Button, MenuItem } from '@mui/material'
import { createPost } from '@/features/posts/services'
import { useNavigate } from 'react-router'
import type { HazardPosition } from '@/features/layers/types'
import { getErrorMessage } from '@/features/auth/utils'
import type { CreatePost } from '@/features/posts/types'
import { appRoutes } from '@/shared/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormContainer from '@/components/ui/FormContainer'
import { useNotificationActions } from '@/shared/stores/notification'

export default function CreatePostForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showNotification, createNotification } = useNotificationActions()

  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const hazardPosition = useField<HazardPosition | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (post: CreatePost) => createPost(post),
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
    if (!hazardPosition.value) {
      return
    }
    mutate({
      title: title.value,
      description: description.value,
      hazardType: hazardType.value,
      longitude: hazardPosition.value['longitude'],
      latitude: hazardPosition.value['latitude'],
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
      <PostMap
        hazardPosition={hazardPosition.value}
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
        {isPending ? 'Submitting...' : 'Report'}
      </Button>
    </FormContainer>
  )
}
