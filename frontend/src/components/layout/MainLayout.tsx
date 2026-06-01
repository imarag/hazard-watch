import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import Notification from '@/components/ui/Notification'
import { useNotification } from '@/shared/stores/notification'

export default function MainLayout() {
  const notification = useNotification()
  return (
    <Box sx={{ backgroundColor: 'background.default', height: '100dvh' }}>
      <Notification open={notification !== null} />
      <Outlet />
    </Box>
  )
}
