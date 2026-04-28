import { Box, Container, Stack, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useSideNav } from '@/contexts/SideNavContext'

interface TopBarProps {
  title: string
  children?: React.ReactNode
  isAuth?: boolean
}

export default function TopBar({
  title,
  isAuth = false,
  children,
}: TopBarProps) {
  const { showSideNav, setShowSideNav } = useSideNav()
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        paddingBlock: 2,
        paddingInline: 2,
      }}
    >
      <Typography variant='body1'>{title}</Typography>
      <Stack sx={{ marginLeft: 'auto' }} direction='row' spacing={1}>
        {children}
      </Stack>
      {!showSideNav && !isAuth && (
        <IconButton
          aria-label='toggle sidebar'
          onClick={() => setShowSideNav((prev) => !prev)}
          sx={{ display: { md: 'none' }, marginLeft: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  )
}
