import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
import { appRoutes } from '@/constants/routes'
import { useCurrentUser, useIsLoggingOut } from '@/stores/auth'
import { useNotificationActions } from '@/stores/notification'

export default function ProtectedRoute() {
  const { showNotification, createNotification } = useNotificationActions()
  const currentUser = useCurrentUser()
  const isLoggingOut = useIsLoggingOut()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser && !isLoggingOut) {
      showNotification(
        createNotification(
          'You must be logged in to access this page.',
          'error',
        ),
      )
      navigate(appRoutes.login.path)
    }
  }, [
    currentUser,
    showNotification,
    navigate,
    createNotification,
    isLoggingOut,
  ])

  if (!currentUser) {
    return null
  }
  return <Outlet />
}
