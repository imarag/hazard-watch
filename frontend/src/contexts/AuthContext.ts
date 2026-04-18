import { createContext, useContext } from 'react'
import type { AuthContextType } from '@/types/users'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error(
      'useCurrentUser has to be used within <authContext.Provider>',
    )
  }

  return authContext
}

export default AuthContext
