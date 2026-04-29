import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { NavLink } from 'react-router'
import { useSideNav } from '@/contexts/SideNavContext'

interface SideNavItemProps {
  to?: string
  link?: boolean
  icon?: React.ReactNode
  label: string
  sx?: SxProps<Theme>
  onClick?: () => void
}

export default function SideNavItem({
  to,
  link = true,
  icon,
  label,
  onClick,
  sx,
}: SideNavItemProps) {
  const { showSideNav, closeSideNav } = useSideNav()

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
        justifyContent: { xs: 'center', sm: 'start', md: 'center' },
        '&:hover': {
          backgroundColor: 'background.default',
        },
        '&.active': {
          backgroundColor: 'background.default',
          color: 'primary.main',
          fontWeight: 'bold',
        },
        '& .MuiButton-startIcon': {
          display: { xs: 'inline', md: 'none', xl: 'inline' },
        },
        ...sx,
        display: 'flex',
      }}
    >
      {label}
    </Button>
  )
}
