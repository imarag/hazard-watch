import { useState } from 'react'
import CurrentUserContext from '@/contexts/CurrentUserContext'
import type { CurrentUser } from '@/types/user'

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined,
  )
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
