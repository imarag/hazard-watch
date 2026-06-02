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
  const [_initialHazardConfig, setInitialHazardConfig] =
    useState<FilterParamsConfig>(filterParamsConfig)
  const [initialHazardConfigDraft, setInitialHazardConfigDraft] =
    useState<FilterParamsConfig>(filterParamsConfig)

  function changeHazardConfig(e, key: string, option: string) {
    const newConfig = {
      ...initialHazardConfigDraft,
      [key]: {
        ...initialHazardConfigDraft[key],
        [option]: {
          ...initialHazardConfigDraft[key][option],
          value: e.target.value,
        },
      },
    }
    setInitialHazardConfigDraft(newConfig)
  }

  function applyQuerySettings() {
    setInitialHazardConfig(initialHazardConfigDraft)
    setFilterParamsDefaults(extractFormValues(initialHazardConfigDraft))
    setShowOptionsMenu(false)
  }

  function restoreSettings() {
    setInitialHazardConfig(filterParamsConfig)
    setInitialHazardConfigDraft(filterParamsConfig) // ← reset draft too
    setFilterParamsDefaults(extractFormValues(filterParamsConfig)) // ← also reset applied params
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
              Object.keys(initialHazardConfigDraft.global) as Array<
                keyof typeof initialHazardConfigDraft.global
              >
            ).map((option) => (
              <FormField
                key={option}
                {...initialHazardConfigDraft.global[option]}
                onChange={(value) =>
                  changeHazardConfig(value, 'global', option)
                }
              />
            ))}
          </FilterPanelSection>
          <Divider />
          <FilterPanelSection title='Hazard Filters'>
            {Object.keys(initialHazardConfigDraft)
              .filter((key) => !['global', 'posts'].includes(key))
              .map((hazard) => (
                <FilterPanelAccordion
                  id={hazard}
                  title={hazardMeta[hazard]['name']}
                  icon={hazardMeta[hazard].muiIcon}
                  color={hazardMeta[hazard].backgroundColor}
                >
                  {(
                    Object.keys(initialHazardConfigDraft[hazard]) as Array<
                      keyof (typeof initialHazardConfigDraft)[typeof hazard]
                    >
                  ).map((option) => (
                    <FormField
                      {...initialHazardConfigDraft[hazard][option]}
                      value={initialHazardConfigDraft[hazard][option]['value']}
                      onChange={(e) => changeHazardConfig(e, hazard, option)}
                    />
                  ))}
                </FilterPanelAccordion>
              ))}
          </FilterPanelSection>
          <FilterPanelSection title='Posts Filters'>
            {Object.keys(initialHazardConfigDraft)
              .filter((key) => key === 'posts')
              .map((key) => (
                <FilterPanelAccordion
                  id={'posts'}
                  title='Posts'
                  icon={postMeta.muiIcon}
                  color={postMeta.backgroundColor}
                >
                  {(
                    Object.keys(initialHazardConfigDraft[key]) as Array<
                      keyof (typeof initialHazardConfigDraft)[typeof key]
                    >
                  ).map((option) => (
                    <FormField
                      {...initialHazardConfigDraft[key][option]}
                      value={initialHazardConfigDraft[key][option]['value']}
                      onChange={(e) => changeHazardConfig(e, key, option)}
                    />
                  ))}
                </FilterPanelAccordion>
              ))}
          </FilterPanelSection>
        </Box>
        <FilterPanelFooter
          restoreSettings={restoreSettings}
          applySettings={applyQuerySettings}
        />
      </Box>
    </Drawer>
  )
}
