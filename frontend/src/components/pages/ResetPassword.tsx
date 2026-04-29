import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate, useSearchParams } from 'react-router'
import useField from '@/hooks/useField'
import { useMutation } from '@tanstack/react-query'
import type { UserResetPassword } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import FormContainer from '@/components/ui/FormContainer'
import { appRoutes } from '@/constants/routes'

export default function ResetPassword() {
  const { showNotification, createNotification } = useNotification()
  const { resetPassword } = useAuth()
  const newPassword = useField('')
  const confirmNewPassword = useField('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  async function handleResetPassword(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!token) {
      showNotification(
        createNotification('Invalid or missing reset token.', 'error'),
      )
      return
    }

    if (newPassword.value !== confirmNewPassword.value) {
      showNotification(createNotification('Passwords do not match.', 'error'))
      return
    }

    mutate({ token, newPassword: newPassword.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: UserResetPassword) => {
      await resetPassword(payload)
    },
    onSuccess: () => {
      showNotification(
        createNotification(
          'Password reset successful! Please log in.',
          'success',
        ),
      )
      navigate(appRoutes.login.path)
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(createNotification(errorMessage, 'error'))
    },
  })

  return (
    <FormContainer title='Reset your password' onSubmit={handleResetPassword}>
      <>
        <TextField
          label='New Password'
          type='password'
          value={newPassword.value}
          onChange={newPassword.onChange}
          required
        />
        <TextField
          label='Confirm New Password'
          type='password'
          value={confirmNewPassword.value}
          onChange={confirmNewPassword.onChange}
          required
        />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          Change password
        </Button>
      </>
    </FormContainer>
  )
}
