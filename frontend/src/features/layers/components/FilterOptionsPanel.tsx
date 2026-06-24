import { Box, Drawer, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { layerMeta } from '@/features/layers/constants'
import FormField from '@/components/ui/FormField'
import FilterPanelAccordion from '@/features/layers/components/FilterPanelAccordion'
import FilterPanelSection from '@/features/layers/components/FilterPanelSection'
import FilterPanelFooter from '@/features/layers/components/FilterPanelFooter'
import {
  filterParamsConfig,
  type FilterParamsConfig,
} from '@/features/layers/config'
import type { HazardType } from '../types'

interface FilterOptionsPanelProps {
  showOptionsMenu: boolean
  setShowOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>
  filterParams: FilterParamsConfig
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParamsConfig>>
}

export default function FilterOptionsPanel({
  showOptionsMenu,
  setShowOptionsMenu,
  filterParams,
  setFilterParams,
}: FilterOptionsPanelProps) {
  const [filterParamsDraft, setFilterParamsDraft] =
    useState<FilterParamsConfig>(filterParams)

  useEffect(() => {
    function initializeParams() {
      setFilterParamsDraft(filterParams)
    }
    initializeParams()
  }, [filterParams])

  function changeConfig(
    value: unknown,
    key: keyof FilterParamsConfig,
    option: string,
  ) {
    setFilterParamsDraft((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [option]: {
          ...prev[key][option],
          value,
        },
      },
    }))
  }

  function applyQuerySettings() {
    setFilterParams(filterParamsDraft)
    setShowOptionsMenu(false)
  }

  function restoreSettings() {
    setFilterParams(filterParamsConfig)
    setFilterParamsDraft(filterParamsConfig)
  }

  return (
    <Drawer
      anchor='right'
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
            <FormField
              {...filterParamsDraft.global.timeRange}
              value={filterParamsDraft.global.timeRange.value}
              onChange={(value) => changeConfig(value, 'global', 'timeRange')}
            />
          </FilterPanelSection>

          <Divider />

          <FilterPanelSection title='Hazard Filters'>
            {(Object.keys(filterParamsDraft) as HazardType[])
              .filter((key) => !(['global', 'post'] as string[]).includes(key))
              .map((hazard) => (
                <FilterPanelAccordion
                  key={hazard}
                  id={hazard}
                  title={layerMeta[hazard].name}
                  icon={layerMeta[hazard].muiIcon}
                  color={layerMeta[hazard].backgroundColor}
                >
                  {(
                    Object.keys(filterParamsDraft[hazard]) as Array<
                      keyof (typeof filterParamsDraft)[typeof hazard]
                    >
                  ).map((option) => (
                    <FormField
                      key={String(option)}
                      {...filterParamsDraft[hazard][option]}
                      value={filterParamsDraft[hazard][option].value}
                      onChange={(value) =>
                        changeConfig(value, hazard, String(option))
                      }
                    />
                  ))}
                </FilterPanelAccordion>
              ))}
          </FilterPanelSection>

          <FilterPanelSection title='Posts Filters'>
            <FilterPanelAccordion
              id='post'
              title='Posts'
              icon={layerMeta.post.muiIcon}
              color={layerMeta.post.backgroundColor}
            >
              {(
                Object.keys(filterParamsDraft.post) as Array<
                  keyof typeof filterParamsDraft.post
                >
              ).map((option) => (
                <FormField
                  key={option}
                  {...filterParamsDraft.post[option]}
                  value={filterParamsDraft.post[option].value}
                  onChange={(value) => changeConfig(value, 'post', option)}
                />
              ))}
            </FilterPanelAccordion>
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
