import { Box, Button } from '@mui/material'
import { Link } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import AddIcon from '@mui/icons-material/Add'

export default function TopBar() {
  const { isUserLoggedIn, logout } = useAuth()

  async function handleLogout() {
    await logout()
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        paddingInline: 4,
        paddingBlock: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ marginLeft: 'auto' }}>
          {isUserLoggedIn ? (
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
        </Box>
      </Box>
    </Box>
  )
}
