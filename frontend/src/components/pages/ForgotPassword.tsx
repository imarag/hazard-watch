import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'
import { useMutation } from '@tanstack/react-query'
import type { UserForgotPassword } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import FormContainer from '@/components/ui/FormContainer'
import { appRoutes } from '@/constants/routes'
import PageLayout from '@/components/layouts/PageLayout'
import BackToHome from '@/components/actions/BackToHome'

export default function ForgotPassword() {
  const { showNotification, createNotification } = useNotification()
  const { sendResetLink } = useAuth()
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
        createNotification('Reset link sent! Check your email.', 'success'),
      )
      navigate(appRoutes.login.path)
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error)
      showNotification(createNotification(errorMessage, 'error'))
    },
  })

  const Action = <BackToHome />

  return (
    <PageLayout pageTitle={appRoutes.login.pageTitle} actions={Action}>
      <FormContainer title='Reset your password' onSubmit={handleResetPassword}>
        <>
          <TextField
            label='Email'
            value={email.value}
            onChange={email.onChange}
            required
          />
          <Button
            loading={isPending}
            type='submit'
            variant='contained'
            fullWidth
          >
            Send reset link
          </Button>
        </>
      </FormContainer>
    </PageLayout>
  )
}
