import { useState, useEffect, useRef } from 'react'
import AuthContext from '@/contexts/AuthContext'
import type { CurrentUser, UserRegister } from '@/types/users'
import authService from '@/services/auth'
import { setToken } from '@/services/api'
import userService from '@/services/auth'
import type { UserLogin } from '@/types/users'
import { useNotification } from '@/contexts/NotificationContext'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()

  // This ref tracks whether the user is currently in the process of logging out.
  // we use it in the ProtectedRoute component to prevent showing the "You must
  // be logged in" notification when the user is logging out and being redirected to the home page.
  const isLoggingOut = useRef(false)

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
    isLoggingOut.current = false
  }

  async function register(userInfo: UserRegister) {
    await userService.register(userInfo)
    showNotification(
      createNotification('Account created successfully!', 'success'),
    )
  }

  async function logout() {
    isLoggingOut.current = true
    await userService.logout()
    setCurrentUser(null)
    showNotification(
      createNotification('You have successfully logged out.', 'success'),
    )
    navigate('/')
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
        isLoggingOut,
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
