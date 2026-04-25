import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import FormFooter from '@/components/ui/FormFooter'
import FormContainer from '../ui/FormContainer'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import useField from '@/hooks/useField'
import { useMutation } from '@tanstack/react-query'
import type { UserRegister } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'

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
        createNotification('You have succesfully register.', 'success'),
      )
      navigate('/')
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
        <TextField label='Email' {...email} required />
        <TextField label='Name' {...name} required />
        <TextField label='Password' type='password' {...password} required />
        <Button loading={isPending} type='submit' variant='contained' fullWidth>
          submit
        </Button>
      </>
    </FormContainer>
  )
}
