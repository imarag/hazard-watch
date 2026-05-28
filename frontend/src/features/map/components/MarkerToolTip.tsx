import { Box, Stack, Typography } from '@mui/material'
import { Tooltip } from 'react-leaflet'

export default function MarkerTooltip({
  tooltip,
}: {
  tooltip: Record<string, unknown>
}) {
  return (
    <Tooltip direction='bottom' offset={[0, 0]} opacity={1}>
      <Stack
        sx={{
          padding: 2,
          minWidth: 200,
          maxWidth: 360,
          overflowY: 'scroll',
        }}
        spacing={0.5}
      >
        {Object.keys(tooltip).map((key, index) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-between',
              gap: 0.1,
            }}
          >
            <Typography variant='body2' sx={{ fontWeight: 'fontWeightBold' }}>
              {key}
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {String(tooltip[key])}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Tooltip>
  )
}
