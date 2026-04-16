import { Box, Stack, Button } from '@mui/material'
import { Link } from 'react-router'
import { useContext } from 'react'
import CurrentUserContext from '@/contexts/CurrentUserContext'

export default function TopBar() {
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <Box sx={{ backgroundColor: 'background.paper', paddingBlock: 2 }}>
      <Stack direction='row'>
        {currentUser ? (
          <Button component={Link} to='/auth/logout'>
            Logout
          </Button>
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
