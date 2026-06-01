import { Button, IconButton, Box, Tooltip } from '@mui/material'
import { Link } from 'react-router'
import type { SvgIconComponent } from '@mui/icons-material'

type CommonProps = {
  icon: SvgIconComponent
  label?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'outlined' | 'contained'
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
}

type LinkProps = CommonProps & {
  to: string | null
  onClick?: never
  loading?: never
}

type ButtonProps = CommonProps & {
  to?: never
  onClick: () => void | Promise<void>
  loading?: boolean
}

type ActionButtonProps = LinkProps | ButtonProps

export default function ActionButton({
  icon,
  label = undefined,
  to = null,
  onClick = () => {},
  loading = false,
  size = 'small',
  variant = 'contained',
  color = 'primary',
}: ActionButtonProps) {
  const linkProps = to ? { component: Link, to } : {}
  const Icon = icon
  return (
    <>
      {/* Small screens: IconButton */}
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <Tooltip title={label ?? ''} placement='top'>
          <span>
            <IconButton
              {...linkProps}
              onClick={onClick}
              size={size}
              color={color}
              disabled={loading}
              aria-label={label}
            >
              {<Icon />}
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      {/* Medium+ screens: Button */}
      <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <Button
          {...linkProps}
          onClick={onClick}
          loading={loading}
          loadingPosition='start'
          startIcon={<Icon className='m-0' />}
          size={size}
          variant={variant}
          color={color}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            justifyContent: 'center',
            '& .MuiButton-startIcon': {
              margin: 0, // ← removes the margin from the icon
            },
          }}
        >
          {label ?? null}
        </Button>
      </Box>
    </>
  )
}
