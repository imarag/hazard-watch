import { Box, Stack, Typography, Divider, Button } from '@mui/material'
import { Marker, Tooltip } from 'react-leaflet'
import Map from '@/components/features/Map'
import { useEffect, useState } from 'react'
import postsService from '@/services/posts'
import type { Post } from '@/types/posts'
import { createHazardIcon } from '@/utils/map'
import { formatKey } from '@/utils/typography'
import { DateFilter, HazardType, type DateFilterValue } from '@/types/hazards'
import HardTypeFilter from '../features/map/HazardTypeFilter'
import PostDateFilter from '../features/map/PostDateFilter'
import { filterDate } from '@/utils/date'

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

interface FiltersPanelProps {
  posts: Post[]
  hazardTypeSelected: HazardType[]
  setHazardTypeSelected: React.Dispatch<React.SetStateAction<HazardType[]>>
  postDateSelected: DateFilterValue
  setPostDateSelected: React.Dispatch<React.SetStateAction<DateFilterValue>>
}

function FiltersPanel({
  posts,
  hazardTypeSelected,
  setHazardTypeSelected,
  postDateSelected,
  setPostDateSelected,
}: FiltersPanelProps) {
  const allHazards: HazardType[] = Object.values(HazardType)
  function handleClearFilters() {
    setHazardTypeSelected(allHazards)
    setPostDateSelected('all')
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        padding: 2,
      }}
      className='leaflet-top leaflet-right'
    >
      <Stack
        direction='column'
        spacing={1}
        divider={<Divider orientation='vertical' flexItem />}
        className='leaflet-control leaflet-bar'
      >
        <HardTypeFilter
          hazardTypeSelected={hazardTypeSelected}
          setHazardTypeSelected={setHazardTypeSelected}
        />
        <PostDateFilter
          postDateSelected={postDateSelected}
          setPostDateSelected={setPostDateSelected}
        />
        <Typography variant='body2'>Found {posts.length} reports.</Typography>
        <Button variant='contained' onClick={handleClearFilters}>
          Clear filters
        </Button>
      </Stack>
    </Box>
  )
}

export default function InteractiveMap() {
  const [posts, setPosts] = useState<Post[]>([])
  const allHazards: HazardType[] = Object.values(HazardType)
  const [hazardTypeSelected, setHazardTypeSelected] =
    useState<HazardType[]>(allHazards)
  const [postDateSelected, setPostDateSelected] = useState<DateFilterValue>(
    DateFilter[0].value,
  )
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await postsService.getAllPosts()
      setPosts(allPosts)
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      hazardTypeSelected.includes(post.hazardType) &&
      filterDate(post.createdAt, postDateSelected),
  )

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Map height='100%' zoom={3}>
          <FiltersPanel
            posts={filteredPosts}
            hazardTypeSelected={hazardTypeSelected}
            setHazardTypeSelected={setHazardTypeSelected}
            postDateSelected={postDateSelected}
            setPostDateSelected={setPostDateSelected}
          />
          {filteredPosts.map((post) => (
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
