import { IconButton, Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { ElementSize } from '@/shared/types/form'

interface MapButtonProps {
  size?: ElementSize
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    L.DomEvent.disableClickPropagation(ref.current)
    L.DomEvent.disableScrollPropagation(ref.current)
  }, [])

  return (
    <Box ref={ref} className='leaflet-control'>
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
