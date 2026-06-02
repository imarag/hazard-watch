import { Box } from '@mui/material'
import Logo from '@/components/layout/Logo'
import NavLinks from '@/components/layout/NavLinks'
import NavButton from '@/components/layout/NavButton'
import { useIsSidebarOpen } from '@/shared/stores/sidenav'

export default function NavigationBar() {
  const isSidebarOpen = useIsSidebarOpen()
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBlock: 1,
        paddingBottom: { xs: isSidebarOpen ? 4 : 1, md: 1 },
        paddingInline: 4,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'background.paper',
        flexWrap: 'wrap',
        gap: { xs: 2, md: 4 },
      }}
    >
      <Logo />
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: isSidebarOpen ? 'flex' : 'none', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 1 },
          width: { xs: '100%', md: 'auto' },
          order: { xs: 2, md: 1 },
          alignItems: { xs: 'stretch', md: 'center' },
        }}
      >
        <NavLinks />
      </Box>
      <NavButton />
    </Box>
  )
}
