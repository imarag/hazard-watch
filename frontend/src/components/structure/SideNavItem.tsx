import { Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { NavLink } from 'react-router'

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
  return (
    <Button
      startIcon={icon}
      component={link ? (NavLink as React.ElementType) : 'button'}
      to={to}
      size='small'
      variant='text'
      fullWidth
      onClick={onClick}
      sx={{
        justifyContent: 'flex-start',
        paddingInline: 2,
        paddingBlock: 0.5,
        '&:hover': {
          backgroundColor: 'background.default',
        },
        '&.active': {
          backgroundColor: 'background.default',
          color: 'primary.main',
          fontWeight: 'bold',
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  )
}
