import FormContainer from '@/components/ui/FormContainer'
import { appRoutes } from '@/shared/constants/routes'
import useField from '@/hooks/useField'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import type { UserUpdateInformation } from '@/features/users/types'
import { getErrorMessage } from '@/features/auth/utils'
import { useAuthActions, useCurrentUser } from '@/features/auth/store'
import { useNotificationActions } from '@/shared/stores/notification'

export default function UpdateInformationForm() {
  const currentUser = useCurrentUser()
  const name = useField(currentUser?.name || '')

  const { showNotification, createNotification } = useNotificationActions()
  const { updateInformation } = useAuthActions()

  const navigate = useNavigate()

  async function handleUpdateInformation(
    e: React.SubmitEvent<HTMLFormElement>,
  ) {
    e.preventDefault()
    mutate({ name: name.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name }: UserUpdateInformation) => {
      const updatedUser = await updateInformation({ name })
      return updatedUser
    },
    onSuccess: () => {
      showNotification(
        createNotification(
          'Account information updated successfully.',
          'success',
        ),
      )
      navigate(appRoutes.home.path)
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(createNotification(errorMessage, 'error'))
    },
  })

  return (
    <FormContainer
      title='Update Account Information'
      onSubmit={handleUpdateInformation}
    >
      <>
        <TextField
          label='Name'
          value={name.value}
          onChange={name.onChange}
          required
        />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          Update information
        </Button>
      </>
    </FormContainer>
  )
}
