import { Box, Stack, Typography } from '@mui/material'
import { Marker, Tooltip } from 'react-leaflet'
import Map from '@/components/features/Map'
import { useEffect, useState } from 'react'
import postsService from '@/services/posts'
import type { Post } from '@/types/posts'

function MarkerTooltip({ post }: { post: Post }) {
  const excludedKeys = ['id', 'userId']
  return (
    <Tooltip direction='bottom' offset={[0, 20]} opacity={1}>
      <Stack
        spacing={0.5}
        sx={{ padding: 2, maxWidth: '280px', textWrap: 'wrap' }}
      >
        {Object.entries(post)
          .filter(([key]) => !excludedKeys.includes(key))
          .map(([key, value]) => (
            <Stack spacing={0.2}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 'fontWeightBold' }}
                key={key}
              >
                {key}
              </Typography>
              <Typography variant='body2'>
                {typeof value === 'object'
                  ? JSON.stringify(value)
                  : String(value)}
              </Typography>
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
    <Box sx={{ height: '100%' }}>
      <Map height='100%' zoom={3}>
        {posts.map((post) => (
          <Marker
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
  )
}
