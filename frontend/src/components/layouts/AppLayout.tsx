import { Box, Container } from '@mui/material'
import SideNav from '@/components/structure/SideNav'
import TopBar from '@/components/structure/TopBar'
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
        <Container
          fixed
          sx={{ flex: 1, overflow: 'auto', padding: { xs: 1, md: 2 } }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
