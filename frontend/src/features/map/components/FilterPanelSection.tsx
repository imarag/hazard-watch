import { Box, Typography } from '@mui/material'

interface FilterPanelSectionProps {
  title: string
  direction?: 'row' | 'column'
  children: React.ReactNode
}

export default function FilterPanelSelction({
  title,
  direction = 'column',
  children,
}: FilterPanelSectionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='subtitle2' color='text.secondary'>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: direction, gap: 2 }}>
        {children}
      </Box>
    </Box>
  )
}
