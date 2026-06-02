import FormContainer from '@/components/ui/FormContainer'
import { appRoutes } from '@/shared/constants/routes'
import useField from '@/hooks/useField'
import { Button, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import type { UserChangePassword } from '@/features/users/types'
import { getErrorMessage } from '@/features/auth/utils'
import { useAuthActions } from '@/features/auth/store'
import { useNotificationActions } from '@/shared/stores/notification'

export default function UpdatePasswordForm() {
  const currentPassword = useField('')
  const newPassword = useField('')

  const { showNotification, createNotification } = useNotificationActions()
  const { changePassword } = useAuthActions()

  const navigate = useNavigate()

  async function handleUpdatePassword(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({ currentPassword: currentPassword.value, newPassword: newPassword.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ currentPassword, newPassword }: UserChangePassword) => {
      await changePassword({ currentPassword, newPassword })
    },
    onSuccess: () => {
      showNotification(createNotification('Password updated successfully.', 'success'))
      navigate(appRoutes.home.path)
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(createNotification(errorMessage, 'error'))
    },
  })

  return (
    <FormContainer title='Update Password' onSubmit={handleUpdatePassword}>
      <>
        <TextField
          label='Current Password'
          type='password'
          value={currentPassword.value}
          onChange={currentPassword.onChange}
          required
        />
        <TextField
          label='New Password'
          type='password'
          value={newPassword.value}
          onChange={newPassword.onChange}
          required
        />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          Update password
        </Button>
      </>
    </FormContainer>
  )
}
