import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'

const ProtectedRoute = () => {
  const { showNotification, createNotification } = useNotification()
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !currentUser) {
      showNotification(
        createNotification(
          'You must be logged in to access this page.',
          'error',
        ),
      )
      navigate('/')
    }
  }, [loading, currentUser, showNotification, navigate, createNotification])

  if (loading) return <div>Loading...</div>
  if (!currentUser) return null
  return <Outlet />
}

export default ProtectedRoute
