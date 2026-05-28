import { Box } from '@mui/material'
import { useState } from 'react'
import { HazardType } from '@/types/hazards'
import ExploreHazardSidebar from '@/features/hazards/components/ExploreHazardSidebar'
import MainMap from '@/features/map/components/MainMap'
import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchHazard } from '@/services/hazards'
import { useNotificationActions } from '@/stores/notification'
import { getErrorMessage } from '@/utils/auth'
import { getAllPosts } from '@/services/posts'

export default function Explore() {
  const { showNotification, createNotification } = useNotificationActions()
  const [enabledHazards, setEnabledHazards] = useState<HazardType[]>([])
  const [showPosts, setShowPosts] = useState(false)

  const hazardQueries = useQueries({
    queries: enabledHazards.map((hazard) => ({
      queryKey: ['hazards', hazard],
      queryFn: () => fetchHazard(hazard),
      staleTime: 5 * 60 * 1000,
    })),
  })

  const hazardsData = hazardQueries
    .map((q, index) => ({
      hazard: enabledHazards[index],
      data: q.data,
    }))
    .filter((q) => q.data !== undefined)

  // to check which hazard is currenly loading
  const hazardQueryMap = Object.fromEntries(
    enabledHazards.map((hazard, index) => [hazard, hazardQueries[index]]),
  )

  const hazardCounts = Object.fromEntries(
    hazardQueries.map((q, index) => [
      enabledHazards[index],
      q.data?.features.length ?? 0,
    ]),
  ) as Partial<Record<HazardType, number>>

  const { data: postsData = [], isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await getAllPosts()
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
    enabled: showPosts,
  })

  const posts = showPosts ? postsData : []

  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex' }}>
      <Box sx={{ paddingInline: 2, paddingBlock: 4, width: 300 }}>
        <ExploreHazardSidebar
          enabledHazards={enabledHazards}
          setEnabledHazards={setEnabledHazards}
          hazardQueryMap={hazardQueryMap}
          postsLoading={postsLoading}
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          totalPosts={posts.length}
          hazardCounts={hazardCounts}
        />
      </Box>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <MainMap hazardsData={hazardsData} posts={posts} />
      </Box>
    </Box>
  )
}
