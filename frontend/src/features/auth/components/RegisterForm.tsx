import FormContainer from '@/components/ui/FormContainer'
import FormFooter from '@/components/ui/FormFooter'
import { appRoutes } from '@/shared/constants/routes'
import useField from '@/hooks/useField'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import type { UserRegister } from '@/features/users/types'
import { getErrorMessage } from '@/features/auth/utils'
import { useAuthActions } from '@/features/auth/store'
import { useNotificationActions } from '@/shared/stores/notification'

export default function RegisterForm() {
  const { showNotification, createNotification } = useNotificationActions()
  const { register } = useAuthActions()
  const email = useField('')
  const password = useField('')
  const name = useField('')
  const navigate = useNavigate()

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
