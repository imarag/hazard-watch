import { Box, Button } from '@mui/material'
import { Link } from 'react-router'
import SettingsIcon from '@mui/icons-material/Settings'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          startIcon={<ArticleIcon />}
          component={Link}
          to='/'
          size='small'
          variant='text'
          fullWidth
        >
          Posts
        </Button>
        <Button
          startIcon={<MapIcon />}
          component={Link}
          to='/map'
          size='small'
          variant='text'
          fullWidth
        >
          Map
        </Button>
      </Box>
      <Button
        sx={{ marginTop: 'auto' }}
        component={Link}
        to='/settings'
        startIcon={<SettingsIcon />}
        size='small'
        variant='text'
        fullWidth
      >
        settings
      </Button>
    </Box>
  )
}
