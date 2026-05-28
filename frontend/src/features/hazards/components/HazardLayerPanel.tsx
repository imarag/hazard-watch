import { Typography, Box, Divider, IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

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
        <IconButton sx={{ color: 'text.disabled' }}>
          <SettingsIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </Box>
    </Box>
  )
}
