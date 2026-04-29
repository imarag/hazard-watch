import { Box } from '@mui/material'
import SideNav from '@/components/structure/SideNav'
import { Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', xl: 'row' },
        height: '100vh',
      }}
    >
      <Box>
        <SideNav />
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', padding: { xs: 1, sm: 2 } }}>
        <Outlet />
      </Box>
    </Box>
  )
}
