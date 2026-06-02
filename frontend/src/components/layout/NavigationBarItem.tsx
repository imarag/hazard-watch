import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { NavLink } from 'react-router'
import { useSidebarActions } from '@/shared/stores/sidenav'

interface NavigationBarItemProps {
  to?: string
  link?: boolean
  icon?: React.ReactNode
  label: string
  sx?: SxProps<Theme>
  onClick?: () => void
}

export default function NavigationBarItem({
  to,
  link = true,
  icon,
  label,
  onClick,
  sx,
}: NavigationBarItemProps) {
  const { closeSidebar } = useSidebarActions()

  function clickSideButton() {
    if (onClick) {
      onClick()
    }
    closeSidebar()
  }
  return (
    <Button
      startIcon={icon}
      component={link ? (NavLink as React.ElementType) : 'button'}
      to={to}
      size='small'
      variant='text'
      onClick={clickSideButton}
      sx={{
        justifyContent: {
          xs: 'center',
          sm: 'start',
          md: 'center',
        },
        '&:hover': {
          backgroundColor: 'background.default',
        },
        '&.active': {
          backgroundColor: 'background.default',
          color: 'primary.main',
          fontWeight: 'bold',
        },
        '& .MuiButton-startIcon': {
          display: { xs: 'flex', md: 'none' },
        },
        ...sx,
        display: 'flex',
      }}
    >
      {label}
    </Button>
  )
}
