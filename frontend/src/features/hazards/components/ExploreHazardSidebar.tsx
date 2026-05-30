import { HazardType } from '@/features/hazards/types'
import {
  Box,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import HazardLayerItem from '@/features/hazards/components/HazardLayerItem'
import HazardLayerPanel from '@/features/hazards/components/HazardLayerPanel'
import { hazardMeta, hazardFormConfig } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'
import type { UseQueryResult } from '@tanstack/react-query'
import type { FeatureCollection } from 'geojson'
import { useState } from 'react'
import FormField from '@/components/ui/FormField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { extractFormValues } from '../utils'
import SettingsIcon from '@mui/icons-material/Settings'

interface ExploreHazardSidebarProps {
  enabledHazards: HazardType[]
  setEnabledHazards: React.Dispatch<React.SetStateAction<HazardType[]>>
  hazardQueryMap: Partial<Record<HazardType, UseQueryResult<FeatureCollection>>>
  postsLoading: boolean
  showPosts: boolean
  setShowPosts: React.Dispatch<React.SetStateAction<boolean>>
  totalPosts: number
  hazardCounts: Partial<Record<HazardType, number>>
  setHazardParams: any
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
  setHazardParams,
}: ExploreHazardSidebarProps) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const allHazards: HazardType[] = Object.values(HazardType)
  const [initialHazardConfig, setInitialHazardConfig] = useState<
    typeof hazardFormConfig
  >(() => hazardFormConfig)

  function toggleHazard(hazard: HazardType) {
    setEnabledHazards((prev) =>
      prev.includes(hazard)
        ? prev.filter((h) => h !== hazard)
        : [...prev, hazard],
    )
  }

  function changeHazardConfig(e, key: HazardType, option: string) {
    const newConfig = {
      ...initialHazardConfig,
      [key]: {
        ...initialHazardConfig[key],
        [option]: {
          ...initialHazardConfig[key][option],
          value: e.target.value,
        },
      },
    }
    setInitialHazardConfig(newConfig)
    setHazardParams(extractFormValues(newConfig))
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
            gap: 2,
            overflowY: 'scroll',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Date filters
              </Typography>
              {(
                Object.keys(initialHazardConfig.global) as Array<
                  keyof typeof initialHazardConfig.global
                >
              ).map((option) => (
                <FormField
                  key={option}
                  {...initialHazardConfig.global[option]}
                  onChange={(value) =>
                    changeHazardConfig(value, 'global', option)
                  }
                />
              ))}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Hazard Options
              </Typography>
              {Object.keys(initialHazardConfig)
                .filter((key) => key !== 'global')
                .map((hazard) => (
                  <Accordion key={hazard}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${hazard}-panel-content`}
                      id={`${hazard}-panel-header`}
                    >
                      <Typography component='span'>{hazard} options</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}
                      >
                        {(
                          Object.keys(initialHazardConfig[hazard]) as Array<
                            keyof (typeof initialHazardConfig)[typeof hazard]
                          >
                        ).map((option) => (
                          <FormField
                            {...initialHazardConfig[hazard][option]}
                            value={initialHazardConfig[hazard][option]['value']}
                            onChange={(e) =>
                              changeHazardConfig(e, hazard, option)
                            }
                          />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexShrink: 0,
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button color='primary' variant='contained'>
              apply
            </Button>
            <Button
              onClick={() => setInitialHazardConfig(hazardFormConfig)}
              color='error'
              variant='outlined'
            >
              reset
            </Button>
          </Box>
        </Box>
      </Drawer>
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
