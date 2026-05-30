import { Box, Drawer, Divider } from '@mui/material'
import { useState } from 'react'
import { hazardMeta, filterParamsConfig } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'
import FormField from '@/components/ui/FormField'
import { extractFormValues } from '@/features/hazards/utils'
import FilterPanelAccordion from '@/features/map/components/FilterPanelAccordion'
import FilterPanelSection from '@/features/map/components/FilterPanelSection'
import FilterPanelFooter from '@/features/map/components/FilterPanelFooter'
import type {
  FilterParamsConfig,
  FilterParamsDefaults,
} from '@/shared/types/config'

interface FilterOptionsPanelProps {
  showOptionsMenu: boolean
  setShowOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>
  setFilterParamsDefaults: React.Dispatch<
    React.SetStateAction<FilterParamsDefaults>
  >
}

export default function FilterOptionsPanel({
  showOptionsMenu,
  setShowOptionsMenu,
  setFilterParamsDefaults,
}: FilterOptionsPanelProps) {
  const [initialHazardConfig, setInitialHazardConfig] =
    useState<FilterParamsConfig>(() => filterParamsConfig)
  console.log(initialHazardConfig, '*****')
  function changeHazardConfig(e, key: string, option: string) {
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
    setFilterParamsDefaults(extractFormValues(newConfig))
  }

  return (
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
          <FilterPanelSection direction='row' title='Date filters'>
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
          </FilterPanelSection>
          <Divider />
          <FilterPanelSection title='Hazard Filters'>
            {Object.keys(initialHazardConfig)
              .filter((key) => !['global', 'posts'].includes(key))
              .map((hazard) => (
                <FilterPanelAccordion
                  id={hazard}
                  title={hazardMeta[hazard]['name']}
                  icon={hazardMeta[hazard].muiIcon}
                  color={hazardMeta[hazard].backgroundColor}
                >
                  {(
                    Object.keys(initialHazardConfig[hazard]) as Array<
                      keyof (typeof initialHazardConfig)[typeof hazard]
                    >
                  ).map((option) => (
                    <FormField
                      {...initialHazardConfig[hazard][option]}
                      value={initialHazardConfig[hazard][option]['value']}
                      onChange={(e) => changeHazardConfig(e, hazard, option)}
                    />
                  ))}
                </FilterPanelAccordion>
              ))}
          </FilterPanelSection>
          <FilterPanelSection title='Posts Filters'>
            {Object.keys(initialHazardConfig)
              .filter((key) => key === 'posts')
              .map((key) => (
                <FilterPanelAccordion
                  id={'posts'}
                  title='Posts'
                  icon={postMeta.muiIcon}
                  color={postMeta.backgroundColor}
                >
                  {(
                    Object.keys(initialHazardConfig[key]) as Array<
                      keyof (typeof initialHazardConfig)[typeof key]
                    >
                  ).map((option) => (
                    <FormField
                      {...initialHazardConfig[key][option]}
                      value={initialHazardConfig[key][option]['value']}
                      onChange={(e) => changeHazardConfig(e, key, option)}
                    />
                  ))}
                </FilterPanelAccordion>
              ))}
          </FilterPanelSection>
        </Box>
        <FilterPanelFooter
          resetConfig={() => setInitialHazardConfig(filterParamsConfig)}
        />
      </Box>
    </Drawer>
  )
}
