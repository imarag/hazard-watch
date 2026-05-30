import { Typography, Box, Divider, IconButton } from '@mui/material'

export default function HazardLayerPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography component='h2' sx={{ fontWeight: 'fontWeightBold' }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </Box>
    </Box>
  )
}
