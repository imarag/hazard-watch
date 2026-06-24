import { Box, Typography, Switch } from '@mui/material'
import type { HazardType } from '../types'
import type { SvgIconComponent } from '@mui/icons-material'

interface HazardLayerItemProps {
  label: string
  icon: SvgIconComponent
  iconColor: string
  enabledLayers: (HazardType | 'post')[]
  setEnabledLayers: React.Dispatch<
    React.SetStateAction<(HazardType | 'post')[]>
  >
  layer: HazardType | 'post'
  loading: boolean
}

export default function HazardLayerItem({
  label,
  icon: Icon,
  iconColor,
  enabledLayers,
  setEnabledLayers,
  layer,
  loading,
}: HazardLayerItemProps) {
  function toggleHazard() {
    setEnabledLayers((prev) =>
      prev.includes(layer) ? prev.filter((h) => h !== layer) : [...prev, layer],
    )
  }

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
          {/* {isEnabled && (
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
          )} */}
          <Switch
            size='small'
            checked={enabledLayers.includes(layer)}
            onChange={toggleHazard}
            disabled={loading}
          />
        </Box>
      </Box>
      {/* {hasNoData && (
        <Alert severity='warning' sx={{ py: 0, mt: 0.5 }}>
          <Typography variant='caption'>
            No data found. Try adjusting filters or moving the map to a
            different location.
          </Typography>
        </Alert>
      )} */}
    </Box>
  )
}
