export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export type Notification = {
  message: string
  type: NotificationType
}

export type NotificationContextType = {
  notification: Notification | null
  showNotification: (notification: Notification) => void
  hideNotification: () => void
  createNotification: (message: string, type: NotificationType) => Notification
}
