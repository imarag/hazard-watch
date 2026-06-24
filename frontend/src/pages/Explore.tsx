import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { type Layer } from '@/features/layers/types'
import ExploreHazardSidebar from '@/features/layers/components/ExploreHazardSidebar'
import MainMap from '@/features/layers/components/MainMap'
import { useQuery } from '@tanstack/react-query'
import {
  filterParamsConfig,
  type FilterParamsConfig,
} from '@/features/layers/config'
import { createQueryParams } from '@/features/layers/utils'
import FilterOptionsPanel from '@/features/layers/components/FilterOptionsPanel'
import { fetchLayers } from '@/features/layers/services'

export default function Explore() {
  const [enabledLayers, setEnabledLayers] = useState<Layer[]>([])
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [filterParams, setFilterParams] =
    useState<FilterParamsConfig>(filterParamsConfig)

  const queryParams = useMemo(
    () => createQueryParams(filterParams, enabledLayers),
    [filterParams, enabledLayers],
  )
  
  const layerQuery = useQuery({
    queryKey: ['hazards', queryParams],
    queryFn: () => fetchLayers(queryParams),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: !!queryParams.bbox && enabledLayers.length > 0,
  })

  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex' }}>
      <FilterOptionsPanel
        showOptionsMenu={showOptionsMenu}
        setShowOptionsMenu={setShowOptionsMenu}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      <Box sx={{ paddingInline: 2, paddingBlock: 4, width: 250 }}>
        <ExploreHazardSidebar
          enabledLayers={enabledLayers}
          setEnabledLayers={setEnabledLayers}
          setShowOptionsMenu={setShowOptionsMenu}
          loading={layerQuery.isFetching}
        />
      </Box>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <MainMap
          setFilterParams={setFilterParams}
          enabledLayers={enabledLayers}
          loading={layerQuery.isFetching}
          layerQuery={layerQuery}
        />
      </Box>
    </Box>
  )
}
