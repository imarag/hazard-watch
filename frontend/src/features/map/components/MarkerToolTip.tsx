import { Box, Typography, Stack } from '@mui/material'
import { Tooltip } from 'react-leaflet'
import { toTitleCase } from '@/shared/utils/typography'

function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
): [string, string][] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}_${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return flattenObject(value as Record<string, unknown>, fullKey)
    }
    return [[fullKey, value !== null && value !== undefined ? String(value) : 'N/A']]
  })
}

export default function MarkerTooltip({
  tooltip,
}: {
  tooltip: Record<string, unknown>
}) {
  const entries = flattenObject(tooltip)

  return (
    <Tooltip direction='bottom' offset={[0, 0]} opacity={1}>
      <Stack sx={{ width: 360, padding: 1 }} spacing={0.5}>
        {entries.map(([key, value]) => (
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
              {toTitleCase(key)}:
            </Typography>
            <Typography variant='body2' sx={{ textWrap: 'wrap' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Tooltip>
  )
}