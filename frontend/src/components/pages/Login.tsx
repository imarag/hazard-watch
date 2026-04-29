import { Button, Box } from '@mui/material'
import { TextField } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'
import { useMutation } from '@tanstack/react-query'
import type { UserLogin } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import FormContainer from '@/components/ui/FormContainer'
import FormFooter from '@/components/ui/FormFooter'
import { appRoutes } from '@/constants/routes'

export default function Login() {
  const { showNotification, createNotification } = useNotification()
  const { login } = useAuth()
  const email = useField('')
  const password = useField('')
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
