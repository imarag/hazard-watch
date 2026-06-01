import {
  emptyInfo,
  HazardType,
  type HazardInfo,
} from '@/features/hazards/types'
import { Box, Button } from '@mui/material'
import HazardLayerItem from '@/features/hazards/components/HazardLayerItem'
import HazardLayerPanel from '@/features/hazards/components/HazardLayerPanel'
import { hazardMeta } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'
import type { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import FilterOptionsPanel from '@/features/map/components/FilterOptionsPanel'
import type { FilterParamsDefaults } from '@/shared/types/config'

interface ExploreHazardSidebarProps {
  enabledHazards: HazardType[]
  setEnabledHazards: React.Dispatch<React.SetStateAction<HazardType[]>>
  hazardQueryMap: Record<HazardType, UseQueryResult>
  postsInfo: HazardInfo
  postsLoading: boolean
  showPosts: boolean
  setShowPosts: React.Dispatch<React.SetStateAction<boolean>>
  setFilterParamsDefaults: React.Dispatch<
    React.SetStateAction<FilterParamsDefaults>
  >
}

export default function ExploreHazardSidebar({
  setEnabledHazards,
  enabledHazards,
  hazardQueryMap,
  postsLoading,
  showPosts,
  setShowPosts,
  postsInfo,
  setFilterParamsDefaults,
}: ExploreHazardSidebarProps) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const allHazards: HazardType[] = Object.values(HazardType)
  function toggleHazard(hazard: HazardType) {
    setEnabledHazards((prev) =>
      prev.includes(hazard)
        ? prev.filter((h) => h !== hazard)
        : [...prev, hazard],
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 4,
      }}
    >
      <FilterOptionsPanel
        showOptionsMenu={showOptionsMenu}
        setShowOptionsMenu={setShowOptionsMenu}
        setFilterParamsDefaults={setFilterParamsDefaults}
      />
      <HazardLayerPanel title='Posts'>
        <HazardLayerItem
          icon={postMeta.muiIcon}
          iconColor={postMeta.backgroundColor}
          label='add post'
          loading={postsLoading}
          isEnabled={showPosts}
          onClick={() => setShowPosts((prev) => !prev)}
          info={postsInfo}
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
            info={hazardQueryMap[hazardName]?.data?.info ?? emptyInfo}
          />
        ))}
      </HazardLayerPanel>
      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => setShowOptionsMenu((prev) => !prev)}
          sx={{ color: 'text.disabled' }}
          endIcon={<SettingsIcon />}
          size='small'
        >
          settings
        </Button>
      </Box>
    </Box>
  )
}
