import { Box } from '@mui/material'
import { useState } from 'react'
import { HazardType, type HazardInfo } from '@/features/hazards/types'
import ExploreHazardSidebar from '@/features/hazards/components/ExploreHazardSidebar'
import MainMap from '@/features/map/components/MainMap'
import { useQuery } from '@tanstack/react-query'
import { extractFormValues } from '@/features/hazards/utils'
import { filterParamsConfig } from '@/features/hazards/constants'
import type { FilterParamsDefaults } from '@/shared/types/config'
import { hazardQueryOptions } from '@/features/hazards/queries'
import { postQueryOptions } from '@/features/posts/queries'
import type { UseQueryResult } from '@tanstack/react-query'

export default function Explore() {
  const [enabledHazards, setEnabledHazards] = useState<HazardType[]>([])
  const [showPosts, setShowPosts] = useState(false)
  const [filterParamsDefaults, setFilterParamsDefaults] =
    useState<FilterParamsDefaults>(() => extractFormValues(filterParamsConfig))

  const earthquakeQuery = useQuery(
    hazardQueryOptions('earthquake', enabledHazards, filterParamsDefaults),
  )
  const wildfireQuery = useQuery(
    hazardQueryOptions('wildfire', enabledHazards, filterParamsDefaults),
  )
  const eruptionQuery = useQuery(
    hazardQueryOptions('eruption', enabledHazards, filterParamsDefaults),
  )
  const tsunamiQuery = useQuery(
    hazardQueryOptions('tsunami', enabledHazards, filterParamsDefaults),
  )
  const postsQuery = useQuery(postQueryOptions(showPosts, filterParamsDefaults))

  const hazardQueryMap = {
    earthquake: earthquakeQuery,
    wildfire: wildfireQuery,
    eruption: eruptionQuery,
    tsunami: tsunamiQuery,
  } satisfies Record<HazardType, UseQueryResult>

  // any hazard or posts currently are loading
  const dataLoading =
    postsQuery.isFetching ||
    Object.values(hazardQueryMap).some((q) => q?.isFetching)

  const postsInfo: HazardInfo = {
    source: 'Hazard Watch Community',
    sourceUrl: '',
    description: 'User-submitted hazard reports',
    totalFeatures: postsQuery.data?.length ?? 0,
  }

  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex' }}>
      <Box sx={{ paddingInline: 2, paddingBlock: 4, width: 250 }}>
        <ExploreHazardSidebar
          enabledHazards={enabledHazards}
          setEnabledHazards={setEnabledHazards}
          hazardQueryMap={hazardQueryMap}
          postsLoading={postsQuery.isFetching}
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          setFilterParamsDefaults={setFilterParamsDefaults}
          postsInfo={postsInfo}
        />
      </Box>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <MainMap
          hazardQueryMap={hazardQueryMap}
          postsQuery={postsQuery}
          showPosts={showPosts}
          setFilterParamsDefaults={setFilterParamsDefaults}
          loading={dataLoading}
          enabledHazards={enabledHazards}
        />
      </Box>
    </Box>
  )
}
