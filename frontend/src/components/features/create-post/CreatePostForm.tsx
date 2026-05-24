import { HazardType } from '@/types/hazards'
import HazardMap from '@/components/features/map/HazardMap'
import useField from '@/hooks/useField'
import { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Box,
} from '@mui/material'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'
import type { HazardPosition, HazardPositionMode } from '@/types/hazards'
import { getErrorMessage } from '@/utils/auth'
import type { CreatePost } from '@/types/posts'
import { appRoutes } from '@/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormContainer from '@/components/ui/FormContainer'
import { useNotificationActions } from '@/stores/notification'

export default function CreatePostForm() {
  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const [selectLocationMode, setSelectLocationMode] =
    useState<HazardPositionMode>('current')
  const [hazardPosition, setHazardPosition] = useState<HazardPosition | null>(
    null,
  )

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHazardPosition({
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        })
      },
      (err) => {
        console.error(err)
        setHazardPosition(null)
      },
    )
  }

  useEffect(() => {
    getCurrentPosition()
  }, [])

  const { showNotification, createNotification } = useNotificationActions()

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
    if (!hazardPosition) {
      return
    }
    mutate({
      title: title.value,
      description: description.value,
      hazardType: hazardType.value,
      longitude: hazardPosition['longitude'],
      latitude: hazardPosition['latitude'],
    })
  }

  function handleChangeSelectLocationMode(
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newMode: HazardPositionMode,
  ) {
    if (!newMode) {
      setHazardPosition(null)
    }

    if (newMode === 'current') {
      getCurrentPosition()
    }

    setSelectLocationMode(newMode)
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          component='p'
          variant='body2'
          sx={{ margin: 0, fontSize: '', color: 'text.disabled' }}
        >
          Set the hazard location
        </Typography>

        <ToggleButtonGroup
          color='primary'
          value={selectLocationMode}
          exclusive
          onChange={handleChangeSelectLocationMode}
          aria-label='Location selection mode'
          size='small'
        >
          <ToggleButton value='current'>Use current location</ToggleButton>

          <ToggleButton value='map'>Select on map</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {selectLocationMode === 'map' && (
        <HazardMap
          onLocationSelect={(longitude: number, latitude: number) =>
            setHazardPosition({ longitude, latitude })
          }
          longitude={hazardPosition?.longitude}
          latitude={hazardPosition?.latitude}
          isLoading={isPending}
          flyToLocation={false}
        />
      )}
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
