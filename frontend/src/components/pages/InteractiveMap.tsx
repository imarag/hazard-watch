import {
  Box,
  Stack,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@mui/material'
import { Marker, Tooltip } from 'react-leaflet'
import Map from '@/components/features/Map'
import { useEffect, useState } from 'react'
import postsService from '@/services/posts'
import type { Post } from '@/types/posts'
import { createHazardIcon } from '@/utils/map'
import { formatKey } from '@/utils/typography'
import { HazardType } from '@/types/hazards'

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

function MarkerTooltip({ post }: { post: Post }) {
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

export default function InteractiveMap() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await postsService.getAllPosts()
      setPosts(allPosts)
    }
    fetchPosts()
  }, [])

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack
        direction='row'
        divider={<Divider orientation='vertical' flexItem />}
        spacing={2}
        sx={{ flexGrow: 0 }}
      >
        <TextField
          id='outlined-select-currency'
          select
          label='Hazard Type'
          defaultValue='EUR'
          helperText='select the hazard type'
          size='small'
        >
          {Object.values(HazardType).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Map height='100%' zoom={3}>
          {posts.map((post) => (
            <Marker
              key={post.id}
              icon={createHazardIcon(post.hazardType)}
              position={[
                post.location.geometry.coordinates[1],
                post.location.geometry.coordinates[0],
              ]}
            >
              <MarkerTooltip post={post} />
            </Marker>
          ))}
        </Map>
      </Box>
    </Box>
  )
}
