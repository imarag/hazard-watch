import { createContext, useContext } from 'react'
import type { NotificationContextType } from '@/types/notification'

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
)

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext)

  if (!notificationContext) {
    throw new Error(
      'useNotification has to be used within <notificationContext.Provider>',
    )
  }

  return notificationContext
}

export default NotificationContext
