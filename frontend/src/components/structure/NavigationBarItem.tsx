import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { NavLink } from 'react-router'
import { useSideNav } from '@/contexts/SideNavContext'

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
  const { closeSideNav } = useSideNav()

  function clickSideButton() {
    if (onClick) onClick()
    closeSideNav()
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
          xl: 'start',
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
          display: { xs: 'inline', md: 'none', xl: 'flex' },
        },
        ...sx,
        display: 'flex',
      }}
    >
      {label}
    </Button>
  )
}
