import { Box } from '@mui/material'
import SideNav from '@/components/structure/SideNav'
import { Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: 200, xl: 250 },
          flexShrink: 0,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <SideNav />
      </Box>

      {/* Right side */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
