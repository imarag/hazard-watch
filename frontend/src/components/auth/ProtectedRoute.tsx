import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import Loading from '@/components/ui/Loading'
import { appRoutes } from '@/constants/routes'

export default function ProtectedRoute() {
  const { showNotification, createNotification } = useNotification()
  const { currentUser, loading, isLoggingOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !currentUser && !isLoggingOut.current) {
      showNotification(
        createNotification(
          'You must be logged in to access this page.',
          'error',
        ),
      )
      navigate(appRoutes.login.path)
    }
  }, [
    loading,
    currentUser,
    showNotification,
    navigate,
    createNotification,
    isLoggingOut,
  ])

  if (loading) return <Loading text='Checking authentication...' />
  if (!currentUser) return null
  return <Outlet />
}
