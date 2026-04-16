import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { Box, Stack } from '@mui/material'
import Title from '../ui/Title'
import FormDescription from './FormDescription'

export default function Register() {
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
        <form>
          <Stack spacing={2}>
            <Title>Register</Title>
            <FormControl required={true}>
              <InputLabel>Email</InputLabel>
              <Input />
            </FormControl>
            <FormControl required={true}>
              <InputLabel>Username</InputLabel>
              <Input />
            </FormControl>
            <FormControl required={true}>
              <InputLabel>Password</InputLabel>
              <Input type='password' />
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
