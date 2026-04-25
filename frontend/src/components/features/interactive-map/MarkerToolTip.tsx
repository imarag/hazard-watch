import { Stack, Typography } from '@mui/material'
import { Tooltip } from 'react-leaflet'
import { formatKey } from '@/utils/typography'

import type { Post } from '@/types/posts'

function ToolTipTitle({ text }: { text: string }) {
  return (
    <Typography variant='body2' sx={{ fontWeight: 'fontWeightBold' }}>
      {formatKey(text)}
    </Typography>
  )
}

function ToolTipText({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant='body2' sx={{ fontWeight: 'fontWeightLight' }}>
      {children}
    </Typography>
  )
}

export default function MarkerTooltip({ post }: { post: Post }) {
  const excludedKeys = ['id', 'userId']
  return (
    <Tooltip direction='bottom' offset={[0, 20]} opacity={1}>
      <Stack
        spacing={0.5}
        sx={{
          padding: 2,
          maxWidth: '280px',
          textWrap: 'wrap',
          overflowY: 'scroll',
        }}
      >
        {Object.entries(post)
          .filter(([key]) => !excludedKeys.includes(key))
          .map(([key, value]) => (
            <Stack key={key} spacing={0.2}>
              <ToolTipTitle text={key} />
              <ToolTipText>
                {typeof value === 'object'
                  ? JSON.stringify(value)
                  : String(value)}
              </ToolTipText>
            </Stack>
          ))}
      </Stack>
    </Tooltip>
  )
}
