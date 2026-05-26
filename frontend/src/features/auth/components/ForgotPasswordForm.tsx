import FormContainer from '@/components/ui/FormContainer'
import { appRoutes } from '@/constants/routes'
import useField from '@/hooks/useField'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import type { UserForgotPassword } from '@/types/users'
import { getErrorMessage } from '@/utils/auth'
import { useAuthActions } from '@/stores/auth'
import { useNotificationActions } from '@/stores/notification'

export default function ForgotPasswordForm() {
  const { showNotification, createNotification } = useNotificationActions()
  const { sendResetLink } = useAuthActions()
  const email = useField('')
  const navigate = useNavigate()

  async function handleResetPassword(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({ email: email.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: UserForgotPassword) => {
      await sendResetLink(payload)
    },
    onSuccess: () => {
      showNotification(
        createNotification(
          'Reset link sent! Check your email and spam folder.',
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
    <FormContainer
      title='Reset your password'
      subtitle='Fill in your email to reset your password'
      onSubmit={handleResetPassword}
    >
      <>
        <TextField
          label='Email'
          value={email.value}
          onChange={email.onChange}
          required
        />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          Send reset link
        </Button>
      </>
    </FormContainer>
  )
}
