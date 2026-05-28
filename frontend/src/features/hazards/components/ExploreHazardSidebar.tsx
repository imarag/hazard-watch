import { HazardType } from '@/types/hazards'
import { Box } from '@mui/material'
import HazardLayerItem from '@/features/hazards/components/HazardLayerItem'
import HazardLayerPanel from '@/features/hazards/components/HazardLayerPanel'
import { hazardMeta } from '@/constants/hazards'
import { postMeta } from '@/constants/posts'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FeatureCollection } from 'geojson'

interface ExploreHazardSidebarProps {
  enabledHazards: HazardType[]
  setEnabledHazards: React.Dispatch<React.SetStateAction<HazardType[]>>
  hazardQueryMap: Partial<Record<HazardType, UseQueryResult<FeatureCollection>>>
  postsLoading: boolean
  showPosts: boolean
  setShowPosts: React.Dispatch<React.SetStateAction<boolean>>
  totalPosts: number
  hazardCounts: Partial<Record<HazardType, number>>
}

export default function ExploreHazardSidebar({
  setEnabledHazards,
  enabledHazards,
  hazardQueryMap,
  postsLoading,
  showPosts,
  setShowPosts,
  totalPosts,
  hazardCounts,
}: ExploreHazardSidebarProps) {
  const allHazards: HazardType[] = Object.values(HazardType)

  function toggleHazard(hazard: HazardType) {
    setEnabledHazards((prev) =>
      prev.includes(hazard)
        ? prev.filter((h) => h !== hazard)
        : [...prev, hazard],
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <HazardLayerPanel title='Posts'>
        <HazardLayerItem
          icon={postMeta.muiIcon}
          iconColor={postMeta.backgroundColor}
          label='add post'
          loading={postsLoading}
          isEnabled={showPosts}
          onClick={() => setShowPosts((prev) => !prev)}
          totalData={totalPosts}
        />
      </HazardLayerPanel>
      <HazardLayerPanel title='Hazards'>
        {allHazards.map((hazardName) => (
          <HazardLayerItem
            key={hazardName}
            icon={hazardMeta[hazardName].muiIcon}
            iconColor={hazardMeta[hazardName].backgroundColor}
            label={hazardMeta[hazardName].name}
            loading={hazardQueryMap[hazardName]?.isLoading ?? false}
            isEnabled={enabledHazards.includes(hazardName)}
            onClick={() => toggleHazard(hazardName)}
            totalData={hazardCounts[hazardName] ?? 0}
          />
        ))}
      </HazardLayerPanel>
    </Box>
  )
}
