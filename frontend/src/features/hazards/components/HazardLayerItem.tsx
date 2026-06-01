import {
  Box,
  Typography,
  Switch,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
  Alert,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import type { HazardInfo } from '../types'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export default function HazardLayerItem({
  label,
  icon: Icon,
  iconColor,
  loading,
  isEnabled,
  onClick,
  info,
}: {
  label: string
  icon: SvgIconComponent
  iconColor: string
  loading: boolean
  isEnabled: boolean
  onClick: () => void
  info: HazardInfo
}) {
  const hasNoData = isEnabled && !loading && info.totalFeatures === 0

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon sx={{ fontSize: 20, color: iconColor || '' }} />
        <Typography
          component='span'
          variant='body2'
          sx={{ color: 'text.disabled', marginLeft: 1 }}
        >
          {label}
        </Typography>
        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {isEnabled && (
            <Tooltip
              title={
                <Stack spacing={0.5} sx={{ p: 0.5 }}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'fontWeightBold' }}
                  >
                    {info.source}
                  </Typography>
                  <Typography variant='caption'>{info.description}</Typography>
                  <Typography variant='caption'>
                    Total: {info.totalFeatures} features
                  </Typography>
                  <Typography variant='caption'>{info.sourceUrl}</Typography>
                </Stack>
              }
              arrow
              placement='right'
            >
              <IconButton size='small'>
                <InfoOutlinedIcon
                  sx={{ fontSize: 16, color: 'text.disabled' }}
                />
              </IconButton>
            </Tooltip>
          )}
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <Switch size='small' checked={isEnabled} onChange={onClick} />
          )}
        </Box>
      </Box>
      {hasNoData && (
        <Alert severity='warning' sx={{ py: 0, mt: 0.5 }}>
          <Typography variant='caption'>
            No data found. Try adjusting filters or moving the map to a
            different location.
          </Typography>
        </Alert>
      )}
    </Box>
  )
}
