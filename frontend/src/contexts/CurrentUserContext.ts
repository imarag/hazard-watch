import { createContext } from 'react'
import type { CurrentUserContextType } from '@/types/user'

const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

export default CurrentUserContext
