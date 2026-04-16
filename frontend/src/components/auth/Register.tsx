import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { Box, Stack } from '@mui/material'
import Title from '../ui/Title'
import FormDescription from './FormDescription'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import userService from '../../services/auth'

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: '',
  })
  const navigate = useNavigate()

  async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(userInfo)
    await userService.register(userInfo)
    navigate('/auth/login')
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
        <form onSubmit={handleRegister}>
          <Stack spacing={2}>
            <Title>Register</Title>
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
              <InputLabel>Name</InputLabel>
              <Input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
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
            <FormDescription to='/auth/login' linkText='Sign in'>
              Already have an account?
            </FormDescription>
          </Stack>
        </form>
      </Container>
    </Box>
  )
}
