import { create } from 'zustand'
import type { Notification, NotificationType } from '@/types/notification'

type State = {
  notification: Notification | null
}

type Actions = {
  actions: {
    showNotification: (notification: Notification) => void
    hideNotification: () => void
    createNotification: (
      message: string,
      type: NotificationType,
    ) => Notification
  }
}

const useNotificationStore = create<State & Actions>((set) => ({
  notification: null,
  actions: {
    showNotification: (notification) => set({ notification }),
    hideNotification: () => set({ notification: null }),
    createNotification: (message, type) => ({ message, type }),
  },
}))

export const useNotification = () => useNotificationStore((s) => s.notification)
export const useNotificationActions = () =>
  useNotificationStore((s) => s.actions)
