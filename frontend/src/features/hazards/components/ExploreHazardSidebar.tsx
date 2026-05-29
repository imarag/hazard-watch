import { HazardType } from '@/features/hazards/types'
import {
  Box,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import HazardLayerItem from '@/features/hazards/components/HazardLayerItem'
import HazardLayerPanel from '@/features/hazards/components/HazardLayerPanel'
import { hazardMeta } from '@/constants/hazards'
import { postMeta } from '@/constants/posts'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FeatureCollection } from 'geojson'
import { useState } from 'react'
import { hazardFormConfig } from '@/constants/hazardsForms'
import FormField from '@/components/ui/FormField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
  const [showOptionsMenu, setShowOptionsMenu] = useState(true)
  const allHazards: HazardType[] = Object.values(HazardType)
  const [initialHazardConfig, setInitialHazardConfig] = useState(() => hazardFormConfig)
  
  function toggleHazard(hazard: HazardType) {
    setEnabledHazards((prev) =>
      prev.includes(hazard)
        ? prev.filter((h) => h !== hazard)
        : [...prev, hazard],
    )
  }

  function changeHazardConfig(hazard: HazardType, property: string) {
    setInitialHazardConfig({
      ...initialHazardConfig,
      [hazard]: {
        ...initialHazardConfig[hazard],
        [property]: {
          ...initialHazardConfig[hazard][property],
          value: e.target.value
        }
      }
    })
  }

  return (
    <>
      <Drawer
        anchor={'right'}
        open={showOptionsMenu}
        onClose={() => setShowOptionsMenu(false)}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            height: '100%',
            padding: 4,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            overflowY: 'scroll',
          }}
        >
          {(Object.keys(hazardFormConfig) as HazardType[]).map((hazard) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${hazard}-panel-content`}
                id={`${hazard}-panel-header`}
              >
                <Typography component='span'>{hazard} options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Object.keys(hazardFormConfig[hazard]).map((option) => (
                    <FormField 
                      {...hazardFormConfig[hazard][option]} 
                      setValue={() => changeHazardConfig(hazard, option)}
                    />
                  ))}o
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>
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
    </>
  )
}
