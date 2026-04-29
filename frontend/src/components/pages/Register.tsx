import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import FormFooter from '@/components/ui/FormFooter'
import FormContainer from '@/components/ui/FormContainer'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import useField from '@/hooks/useField'
import { useMutation } from '@tanstack/react-query'
import type { UserRegister } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import { appRoutes } from '@/constants/routes'
import BackToHome from '@/components/actions/BackToHome'

export default function Register() {
  const { showNotification, createNotification } = useNotification()
  const email = useField('')
  const password = useField('')
  const name = useField('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const formFooter = (
    <FormFooter to='/auth/login' linkText='Sign in'>
      Already have an account?
    </FormFooter>
  )

  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({ email: email.value, password: password.value, name: name.value })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password, name }: UserRegister) => {
      await register({ email, password, name })
    },
    onSuccess: () => {
      showNotification(
        createNotification('Account created successfully!', 'success'),
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
      title='Join HazardWatch'
      onSubmit={handleRegister}
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
          label='Name'
          value={name.value}
          onChange={name.onChange}
          required
        />
        <TextField
          label='Password'
          type='password'
          value={password.value}
          onChange={password.onChange}
          required
        />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          submit
        </Button>
      </>
    </FormContainer>
  )
}
