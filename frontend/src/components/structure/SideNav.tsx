import { Box, Button } from '@mui/material'
import { Link } from 'react-router'
import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import ThemeSwitch from '../ui/ThemeSwitch'

export default function SideNav() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        paddingTop: 12,
        paddingBottom: 4,
        paddingInline: 2,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 1,
            width: 'min-content',
          }}
        >
          <Button
            startIcon={<ArticleIcon />}
            component={Link}
            to='/'
            size='small'
            variant='text'
          >
            Posts
          </Button>
          <Button
            startIcon={<MapIcon />}
            component={Link}
            to='/map'
            size='small'
            variant='text'
          >
            Map
          </Button>
          <Button
            startIcon={<PersonIcon />}
            component={Link}
            to='/about'
            size='small'
            variant='text'
          >
            About
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ThemeSwitch />
      </Box>
    </Box>
  )
}
