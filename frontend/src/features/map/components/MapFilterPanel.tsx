import { Box, Divider } from '@mui/material'
import type { Post } from '@/types/posts'
import { HazardType, type DateFilterValue } from '@/types/hazards'
import HazardTypeFilter from '@/components/features/map/HazardTypeFilter'
import PostDateFilter from '@/components/features/map/PostDateFilter'
import FilterPanelHeader from '@/components/features/interactive-map/FilterPanelHeader'
import FilterPanelFooter from '@/components/features/interactive-map/FilterPanelFooter'
import FilterPanelSection from '@/components/features/interactive-map/FilterPanelSection'

interface FiltersPanelProps {
  posts: Post[]
  hazardTypeSelected: HazardType[]
  setHazardTypeSelected: React.Dispatch<React.SetStateAction<HazardType[]>>
  postDateSelected: DateFilterValue
  setPostDateSelected: React.Dispatch<React.SetStateAction<DateFilterValue>>
  onClearFilters: () => void
  onClosePanel: () => void
}

export default function MapFilterPanel({
  posts,
  hazardTypeSelected,
  setHazardTypeSelected,
  postDateSelected,
  setPostDateSelected,
  onClosePanel,
  onClearFilters,
}: FiltersPanelProps) {
  const totalPosts = posts.length

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        margin: 1,
        paddingInline: 4,
        paddingBlock: 2,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1500, // above map layers
        pointerEvents: 'all',
        borderRadius: 1,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: { xs: 280, sm: 350 },
        opacity: 0.9,
      }}
      className='leaflet-control'
    >
      <FilterPanelHeader onClosePanel={onClosePanel} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <FilterPanelSection title='Hazard type'>
          <HazardTypeFilter
            hazardTypeSelected={hazardTypeSelected}
            setHazardTypeSelected={setHazardTypeSelected}
          />
        </FilterPanelSection>
        <FilterPanelSection title='Report date'>
          <PostDateFilter
            postDateSelected={postDateSelected}
            setPostDateSelected={setPostDateSelected}
          />
        </FilterPanelSection>
      </Box>
      <Divider />
      <FilterPanelFooter
        totalPosts={totalPosts}
        onClearFilters={onClearFilters}
      />
    </Box>
  )
}
