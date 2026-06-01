import FormContainer from '@/components/ui/FormContainer'
import FormFooter from '@/components/ui/FormFooter'
import { appRoutes } from '@/shared/constants/routes'
import useField from '@/hooks/useField'
import { Button, Box, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import type { UserLogin } from '@/features/users/types'
import { getErrorMessage } from '@/features/auth/utils'
import { useAuthActions } from '@/features/auth/store'
import { useNotificationActions } from '@/shared/stores/notification'

export default function LoginForm() {
  const email = useField('')
  const password = useField('')

  const { showNotification, createNotification } = useNotificationActions()
  const { login } = useAuthActions()

  const navigate = useNavigate()

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({ email: email.value, password: password.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }: UserLogin) => {
      await login({ email, password })
    },
    onSuccess: () => {
      showNotification(createNotification('Welcome back.', 'success'))
      navigate(appRoutes.home.path)
    },
    onError: (error: unknown) => {
      console.log(error, '**', error.message)
      const errorMessage = getErrorMessage(error)
      showNotification(createNotification(errorMessage, 'error'))
    },
  })

  const formFooter = (
    <FormFooter to={appRoutes.register.path} linkText='Register now'>
      Don’t have an account?
    </FormFooter>
  )
  return (
    <FormContainer
      title='Log In to HazardWatch'
      onSubmit={handleLogin}
      footer={formFooter}
    >
      <>
        <TextField
          label='Email'
          value={email.value}
          onChange={email.onChange}
          required
        />
        <TextField
          label='Password'
          type='password'
          value={password.value}
          onChange={password.onChange}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant='text'
            size='small'
            onClick={() => navigate(appRoutes.forgotPassword.path)}
          >
            Forgot password?
          </Button>
        </Box>
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          Submit
        </Button>
      </>
    </FormContainer>
  )
}
