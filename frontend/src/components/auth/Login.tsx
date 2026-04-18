import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Box, Stack, TextField } from '@mui/material'
import Title from '@/components/ui/Title'
import FormDescription from '@/components/auth/FormDescription'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'

export default function Login() {
  const { login } = useAuth()
  const email = useField('giannis.marar@hotmail.com')
  const password = useField('12345678')
  const navigate = useNavigate()

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    await login({ email: email.value, password: password.value })
    navigate('/')
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
        <Stack component='form' onSubmit={handleLogin} spacing={2}>
          <Title>Sign in</Title>
          <TextField label='Email' {...email} required />
          <TextField label='Password' type='password' {...password} required />
          <Button type='submit' variant='contained' fullWidth>
            submit
          </Button>
          <FormDescription to='/auth/register' linkText='Register now'>
            Don’t have an account?
          </FormDescription>
        </Stack>
      </Container>
    </Box>
  )
}
