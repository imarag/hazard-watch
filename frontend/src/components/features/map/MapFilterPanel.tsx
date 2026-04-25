import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material'
import type { Post } from '@/types/posts'
import { HazardType, type DateFilterValue } from '@/types/hazards'
import HazardTypeFilter from '@/components/features/map/HazardTypeFilter'
import PostDateFilter from '@/components/features/map/PostDateFilter'
import CloseIcon from '@mui/icons-material/Close'

function FilterPanelHeader({ onClosePanel }: { onClosePanel: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={onClosePanel}>
        <CloseIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 'fontWeightBold' }} variant='subtitle1'>
        Filters
      </Typography>
    </Box>
  )
}

function FilterPanelFooter({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='body2'>
        Found{' '}
        <Typography
          component='span'
          variant='body2'
          sx={{ fontWeight: 'fontWeightBold' }}
        >
          X
        </Typography>{' '}
        reports.
      </Typography>
      <Button size='small' variant='text' onClick={onClearFilters}>
        Clear filters
      </Button>
    </Box>
  )
}

function FilterPanelSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Stack direction='column' spacing={1}>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 'fontWeightMedium', color: 'text.secondary' }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

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
        borderRadius: 1,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 350,
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
        <FilterPanelSection title='Hazard type filters'>
          <HazardTypeFilter
            hazardTypeSelected={hazardTypeSelected}
            setHazardTypeSelected={setHazardTypeSelected}
          />
        </FilterPanelSection>
        <FilterPanelSection title='Post date filters'>
          <PostDateFilter
            postDateSelected={postDateSelected}
            setPostDateSelected={setPostDateSelected}
          />
        </FilterPanelSection>
      </Box>
      <Divider />
      <FilterPanelFooter onClearFilters={onClearFilters} />
    </Box>
  )
}
