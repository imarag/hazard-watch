import { IconButton, Box } from '@mui/material'

interface MapButtonProps {
  size?: 'small' | 'medium' | 'large'
  icon: React.ReactNode
  onClick?: () => void
  title?: string
}

export default function MapButton({
  icon,
  size = 'medium',
  onClick,
  title,
}: MapButtonProps) {
  return (
    <Box className='leaflet-control'>
      <IconButton
        onClick={onClick}
        size={size}
        title={title}
        sx={{
          boxShadow: 2,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          },
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease',
          '&:active': { transform: 'scale(0.95)' },
        }}
      >
        {icon}
      </IconButton>
    </Box>
  )
}
