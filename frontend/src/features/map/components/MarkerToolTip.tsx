import { Box, Typography, Stack } from '@mui/material'
import { Tooltip } from 'react-leaflet'
import { camelToTitle } from '@/shared/utils/typography'

export default function MarkerTooltip({
  tooltip,
}: {
  tooltip: Record<string, unknown>
}) {
  return (
    <Tooltip direction='bottom' offset={[0, 0]} opacity={1}>
      <Stack sx={{ width: 360, padding: 1 }} spacing={0.5}>
        {Object.entries(tooltip).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant='body2'
              sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
            >
              {camelToTitle(key)}:
            </Typography>
            <Typography variant='body2' sx={{ textWrap: 'wrap' }}>
              {value ? String(value) : 'N/A'}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Tooltip>
  )
}
