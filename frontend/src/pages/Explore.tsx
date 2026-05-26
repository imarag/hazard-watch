import { Box } from '@mui/material'
import { useState } from 'react'
import postsService from '@/services/posts'
import { DateFilter, HazardType, type DateFilterValue } from '@/types/hazards'
import { filterDate } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import { useNotificationActions } from '@/stores/notification'
import { getErrorMessage } from '@/utils/auth'
import MainMap from '../features/interactive-map/MainMap'

export default function Explore() {
  const { showNotification, createNotification } = useNotificationActions()

  const allHazards: HazardType[] = Object.values(HazardType)
  const [openFilterPanel, setOpenFilterPanel] = useState(false)
  const [hazardTypeSelected, setHazardTypeSelected] = useState<HazardType[]>(
    () => allHazards,
  )
  const [postDateSelected, setPostDateSelected] =
    useState<DateFilterValue>('all')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await postsService.getAllPosts()
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        showNotification(
          createNotification(
            `Cannot fetch the posts: ${errorMessage}`,
            'error',
          ),
        )
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  function handleClearFilters() {
    setHazardTypeSelected(allHazards)
    setPostDateSelected(DateFilter[DateFilter.length - 1].value)
  }

  const filteredPosts = posts.filter(
    (post) =>
      hazardTypeSelected.includes(post.hazardType) &&
      filterDate(post.createdAt, postDateSelected),
  )

  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex' }}>
      <div></div>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <MainMap
          openFilterPanel={openFilterPanel}
          setOpenFilterPanel={setOpenFilterPanel}
        />
      </Box>
    </Box>
  )
}
