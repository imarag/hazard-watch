import { HazardType } from '@/features/layers/types'
import { Box, Button } from '@mui/material'
import HazardLayerItem from '@/features/layers/components/HazardLayerItem'
import HazardLayerPanel from '@/features/layers/components/HazardLayerPanel'
import { layerMeta } from '@/features/layers/constants'
import SettingsIcon from '@mui/icons-material/Settings'

interface ExploreHazardSidebarProps {
  enabledLayers: (HazardType | 'post')[]
  setEnabledLayers: React.Dispatch<
    React.SetStateAction<(HazardType | 'post')[]>
  >
  setShowOptionsMenu: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export default function ExploreHazardSidebar({
  enabledLayers,
  setEnabledLayers,
  setShowOptionsMenu,
  loading,
}: ExploreHazardSidebarProps) {
  const allHazards: HazardType[] = Object.values(HazardType)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 4,
      }}
    >
      <HazardLayerPanel title='Posts'>
        <HazardLayerItem
          label='Add posts'
          icon={layerMeta.post.muiIcon}
          iconColor={layerMeta.post.backgroundColor}
          enabledLayers={enabledLayers}
          setEnabledLayers={setEnabledLayers}
          layer='post'
          loading={loading}
        />
      </HazardLayerPanel>
      <HazardLayerPanel title='Hazards'>
        {allHazards.map((hazardName) => (
          <HazardLayerItem
            key={hazardName}
            label={layerMeta[hazardName].name}
            icon={layerMeta[hazardName].muiIcon}
            iconColor={layerMeta[hazardName].backgroundColor}
            enabledLayers={enabledLayers}
            setEnabledLayers={setEnabledLayers}
            layer={hazardName}
            loading={loading}
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
