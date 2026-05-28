import { Box, Typography, Switch, CircularProgress } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'

export default function HazardLayerItem({
  label,
  icon: Icon,
  iconColor,
  loading,
  isEnabled,
  onClick,
  totalData,
}: {
  label: string
  icon: SvgIconComponent
  iconColor: string
  loading: boolean
  isEnabled: boolean
  onClick: () => void
  totalData: number
}) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {<Icon sx={{ fontSize: 20, color: iconColor || '' }} />}
        <Typography
          component='span'
          variant='body2'
          sx={{ color: 'text.disabled', marginLeft: 1 }}
        >
          {label}
        </Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <Switch size='small' checked={isEnabled} onChange={onClick} />
          )}
        </Box>
      </Box>
      {isEnabled && !loading && (
        <Box sx={{ backgroundColor: 'background.paper', padding: 2 }}>
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            {totalData.toLocaleString()} events
          </Typography>
        </Box>
      )}
    </Box>
  )
}
