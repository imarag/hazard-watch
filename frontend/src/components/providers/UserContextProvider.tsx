import { useState, useEffect } from 'react'
import AuthContext from '@/contexts/AuthContext'
import type { CurrentUser, UserRegister } from '@/types/users'
import authService from '../../services/auth'
import { setToken } from '../../services/api'
import userService from '../../services/auth'
import type { UserLogin } from '@/types/users'

interface UserContextProviderProps {
  children: React.ReactNode
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

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
  }

  async function register(userInfo: UserRegister) {
    await userService.register(userInfo)
  }

  async function logout() {
    await userService.logout()
    setCurrentUser(null)
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
