import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Box, Stack, TextField } from '@mui/material'
import Title from '@/components/ui/Title'
import FormDescription from '@/components/auth/FormDescription'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import useField from '@/hooks/useField'

export default function Register() {
  const email = useField('')
  const password = useField('')
  const name = useField('')
  const navigate = useNavigate()
  const { register } = useAuth()

  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    await register({
      email: email.value,
      password: password.value,
      name: name.value,
    })
    navigate('/auth/login')
  }
  return (
    <Box
      sx={{
        height: '100%',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Container
        maxWidth='sm'
        sx={{
          mt: 4,
          backgroundColor: 'background.paper',
          paddingBlock: 4,
        }}
      >
        <Stack component='form' onSubmit={handleRegister} spacing={2}>
          <Title>Register</Title>
          <TextField label='Email' {...email} required />
          <TextField label='Name' {...name} required />
          <TextField label='Password' type='password' {...password} required />
          <Button type='submit' variant='contained' fullWidth>
            submit
          </Button>
          <FormDescription to='/auth/login' linkText='Sign in'>
            Already have an account?
          </FormDescription>
        </Stack>
      </Container>
    </Box>
  )
}
