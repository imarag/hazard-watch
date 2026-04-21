import { useState, useEffect } from 'react'
import AuthContext from '@/contexts/AuthContext'
import type { CurrentUser, UserRegister } from '@/types/users'
import authService from '@/services/auth'
import { setToken } from '@/services/api'
import userService from '@/services/auth'
import type { UserLogin } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'

interface AuthContextProviderProps {
  children: React.ReactNode
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { createNotification, showNotification } = useNotification()

  const isUserLoggedIn = currentUser !== null

  useEffect(() => {
    async function restoreSession() {
      setLoading(true)
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
  }, [])

  async function login(credentials: UserLogin) {
    const loginResult = await userService.login(credentials)
    setCurrentUser({ id: loginResult.id, email: loginResult.email })
    setToken(loginResult.token)
    showNotification(createNotification('Welcome back!', 'success'))
  }

  async function register(userInfo: UserRegister) {
    await userService.register(userInfo)
    showNotification(
      createNotification('Account created successfully!', 'success'),
    )
  }

  async function logout() {
    await userService.logout()
    setCurrentUser(null)
    showNotification(
      createNotification('You have successfully logged out.', 'success'),
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isUserLoggedIn,
        login,
        register,
        logout,
        loading,
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
