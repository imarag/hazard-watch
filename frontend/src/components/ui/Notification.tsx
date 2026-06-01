import { Box, Snackbar, Alert } from '@mui/material'
import {
  useNotificationActions,
  useNotification,
} from '@/shared/stores/notification'

interface NotificationProps {
  open: boolean
}

export default function Notification({ open }: NotificationProps) {
  const { hideNotification } = useNotificationActions()
  const notification = useNotification()
  return (
    <Box>
      <Snackbar open={open} autoHideDuration={5000} onClose={hideNotification}>
        <Alert
          onClose={hideNotification}
          severity={notification?.type}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
