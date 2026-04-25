import NotificationContext from '../../contexts/NotificationContext'
import { useState, useCallback } from 'react'
import type { Notification, NotificationType } from '../../types/notification'
import { Alert, Snackbar } from '@mui/material'

interface NotificationProviderProps {
  children: React.ReactNode
}

export default function NotificationContextProvider({
  children,
}: NotificationProviderProps) {
  const [notification, setNotification] = useState<Notification | null>(null)

  function hideNotification() {
    setNotification(null)
  }

  const showNotification = useCallback((notification: Notification) => {
    setNotification(notification)
  }, [])

  const createNotification = useCallback(
    (message: string, type: NotificationType) => {
      return { message, type }
    },
    [],
  )

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
        createNotification,
      }}
    >
      <Snackbar
        open={!!notification}
        onClose={hideNotification}
        autoHideDuration={3000}
      >
        <Alert severity={notification?.type} onClose={hideNotification}>
          {notification?.message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  )
}
