import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useIsSidebarOpen, useSidebarActions } from '@/shared/stores/sidenav'

export default function NavButton() {
  const isSidebarOpen = useIsSidebarOpen()
  const { toggleSidebar } = useSidebarActions()

  return (
    <IconButton
      aria-label='toggle sidebar'
      onClick={() => toggleSidebar()}
      sx={{ display: { md: 'none', marginLeft: 'auto' }, padding: 0 }}
    >
      {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  )
}
