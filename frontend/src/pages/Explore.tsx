import { Box } from '@mui/material'
import { useState } from 'react'
import { HazardType } from '@/features/hazards/types'
import ExploreHazardSidebar from '@/features/hazards/components/ExploreHazardSidebar'
import MainMap from '@/features/map/components/MainMap'
import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchHazard } from '@/features/hazards/services'
import { useNotificationActions } from '@/shared/stores/notification'
import { getErrorMessage } from '@/features/auth/utils'
import { getAllPosts } from '@/features/posts/services'
import { extractFormValues } from '@/features/hazards/utils'
import { filterParamsConfig } from '@/features/hazards/constants'
import type { FilterParamsDefaults } from '@/shared/types/config'

export default function Explore() {
  const { showNotification, createNotification } = useNotificationActions()
  const [enabledHazards, setEnabledHazards] = useState<HazardType[]>([])
  const [showPosts, setShowPosts] = useState(false)
  const [filterParamsDefaults, setFilterParamsDefaults] =
    useState<FilterParamsDefaults>(() => extractFormValues(filterParamsConfig))

  const hazardQueries = useQueries({
    queries: enabledHazards.map((hazard) => ({
      queryKey: [
        'hazards',
        hazard,
        filterParamsDefaults[hazard],
        filterParamsDefaults.global,
      ],
      queryFn: () =>
        fetchHazard(hazard, {
          ...filterParamsDefaults.global,
          ...filterParamsDefaults[hazard],
        }),
      staleTime: 5 * 60 * 1000,
      placeholderData: (previousData) => previousData,
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
    queryKey: [
      'posts',
      filterParamsDefaults['posts'],
      filterParamsDefaults.global,
    ],
    queryFn: async () => {
      try {
        const rawParams = {
          ...filterParamsDefaults.global,
          ...filterParamsDefaults.posts,
        }
        const params = Object.fromEntries(
          Object.entries(rawParams).filter(
            ([_, v]) => v !== '' && v !== null && v !== undefined,
          ),
        )
        return await getAllPosts(params)
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
    placeholderData: (previousData) => previousData,
  })

  const posts = showPosts ? postsData : []

  const dataLoading =
    postsLoading || Object.values(hazardQueryMap).some((q) => q?.isLoading)

  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex' }}>
      <Box sx={{ paddingInline: 2, paddingBlock: 4, width: 250 }}>
        <ExploreHazardSidebar
          enabledHazards={enabledHazards}
          setEnabledHazards={setEnabledHazards}
          hazardQueryMap={hazardQueryMap}
          postsLoading={postsLoading}
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          totalPosts={posts.length}
          hazardCounts={hazardCounts}
          setFilterParamsDefaults={setFilterParamsDefaults}
        />
      </Box>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <MainMap
          hazardsData={hazardsData}
          posts={posts}
          setFilterParamsDefaults={setFilterParamsDefaults}
          loading={dataLoading}
        />
      </Box>
    </Box>
  )
}
