import SideNavContext from '@/contexts/SideNavContext'
import { useState } from 'react'

interface SideNavProviderProps {
  children: React.ReactNode
}

export default function SideNavContextProvider({
  children,
}: SideNavProviderProps) {
  const [showSideNav, setShowSideNav] = useState(false)

  function openSideNav() {
    setShowSideNav(true)
  }

  function closeSideNav() {
    setShowSideNav(false)
  }

  return (
    <SideNavContext.Provider
      value={{
        showSideNav,
        setShowSideNav,
        openSideNav,
        closeSideNav,
      }}
    >
      {children}
    </SideNavContext.Provider>
  )
}
