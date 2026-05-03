import { Box, Stack } from '@mui/material'
import NavigationBar from '../structure/NavigationBar'
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
        <NavigationBar />
      </Box>
      <Stack
        sx={{ flex: 1, overflow: 'auto', padding: { xs: 1, md: 2 } }}
        spacing={{ xs: 1, md: 2 }}
      >
        <Outlet />
      </Stack>
    </Box>
  )
}
