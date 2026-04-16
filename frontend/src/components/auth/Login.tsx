import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { Box, Stack } from '@mui/material'
import Title from '../ui/Title'
import FormDescription from './FormDescription'
import userService from '../../services/auth'
import { useState } from 'react'
import { useCurrentUser } from '@/contexts/CurrentUserContext'
import { useNavigate } from 'react-router'

export default function Login() {
  const { setCurrentUser } = useCurrentUser()
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const loginResult = await userService.login(userInfo)
    setCurrentUser({ id: loginResult.id, email: loginResult.email })
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Container
        maxWidth='sm'
        sx={{
          backgroundColor: 'background.paper',
          paddingInline: 8,
          paddingBlock: 4,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <Title>Login</Title>
            <FormControl required={true}>
              <InputLabel>Email</InputLabel>
              <Input
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl required={true}>
              <InputLabel>Password</InputLabel>
              <Input
                type='password'
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />
            </FormControl>
            <Box sx={{ pt: 2 }}>
              <Button type='submit' variant='contained' fullWidth>
                submit
              </Button>
            </Box>
            <FormDescription to='/auth/register' linkText='Register now'>
              Don’t have an account?
            </FormDescription>
          </Stack>
        </form>
      </Container>
    </Box>
  )
}
