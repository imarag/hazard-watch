import { Box, Stack, Button } from '@mui/material'
import { Link } from 'react-router'
import userService from '../../services/auth'
import { useCurrentUser } from '@/contexts/CurrentUserContext'

export default function TopBar() {
  const { currentUser, setCurrentUser } = useCurrentUser()

  async function handleLogout() {
    userService.logout()
    setCurrentUser(null)
  }

  return (
    <Box sx={{ backgroundColor: 'background.paper', paddingBlock: 2 }}>
      <Stack direction='row'>
        {currentUser ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button component={Link} to='/auth/login'>
              Login
            </Button>
            <Button component={Link} to='/auth/register'>
              Register
            </Button>
          </>
        )}
      </Stack>
    </Box>
  )
}
