import { createContext, useContext } from 'react'
import type { CurrentUserContextType } from '@/types/user'

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined,
)

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext)

  if (!currentUserContext) {
    throw new Error(
      'useCurrentUser has to be used within <CurrentUserContext.Provider>',
    )
  }

  return currentUserContext
}

export default CurrentUserContext
