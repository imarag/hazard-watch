export type SideNavContextType = {
  showSideNav: boolean
  setShowSideNav: React.Dispatch<React.SetStateAction<boolean>>
  openSideNav: () => void
  closeSideNav: () => void
}
