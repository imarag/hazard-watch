import { Box, Button, Container, Stack } from '@mui/material'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import AddIcon from '@mui/icons-material/Add'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'

export default function TopBar() {
  const { isUserLoggedIn, logout } = useAuth()

  async function handleLogout() {
    await logout()
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <Container
        fixed
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: { xs: 1, md: 2 },
          display: 'flex',
          alignItems: 'center',
          paddingBlock: 2,
          gap: 2,
        }}
      >
        {isUserLoggedIn && (
          <Button
            component={Link}
            to='/posts/create'
            endIcon={<AddIcon />}
            size='small'
            variant='contained'
          >
            Create Post
          </Button>
        )}
        <Stack sx={{ marginLeft: 'auto' }} direction='row' spacing={1}>
          {isUserLoggedIn ? (
            <Button
              size='small'
              endIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                size='small'
                endIcon={<LoginRoundedIcon />}
                component={Link}
                to='/auth/login'
              >
                Login
              </Button>
              <Button
                size='small'
                endIcon={<AppRegistrationRoundedIcon />}
                component={Link}
                to='/auth/register'
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
