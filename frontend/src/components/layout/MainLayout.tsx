import { Box } from '@mui/material'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <Box sx={{ backgroundColor: 'background.default', height: '100dvh' }}>
      <Outlet />
    </Box>
  )
}
