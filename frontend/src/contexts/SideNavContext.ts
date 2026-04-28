import { createContext, useContext } from 'react'
import type { SideNavContextType } from '@/types/sidenav'

const SideNavContext = createContext<SideNavContextType | undefined>(undefined)

export const useSideNav = () => {
  const sideNavContext = useContext(SideNavContext)

  if (!sideNavContext) {
    throw new Error(
      'useNotification has to be used within <sideNavContext.Provider>',
    )
  }

  return sideNavContext
}

export default SideNavContext
