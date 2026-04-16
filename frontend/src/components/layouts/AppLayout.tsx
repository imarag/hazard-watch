import { Box } from '@mui/material'
import SideNav from '../structure/SideNav'
import TopBar from '../structure/TopBar'
import { Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SideNav />
      </Box>

      {/* Right side */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <Box sx={{ flexShrink: 0 }}>
          <TopBar />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
