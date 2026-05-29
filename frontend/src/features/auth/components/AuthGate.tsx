import { useState, useEffect } from 'react'
import authService from '@/features/auth/services'
import { setToken } from '@/lib/api'
import { useAuthActions } from '@/features/auth/store'

interface AuthGateProps {
  children: React.ReactNode
}

export default function AuthGate({ children }: AuthGateProps) {
  const [loading, setLoading] = useState(true)
  const { setCurrentUser } = useAuthActions()

  useEffect(() => {
    async function restoreSession() {
      try {
        const res = await authService.refreshToken()
        setToken(res.token)
        setCurrentUser({ id: res.id, email: res.email })
      } catch {
        setToken(null)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [setCurrentUser])

  if (loading) {
    return <p>Loading...</p>
  }
  return <>{children}</>
}
