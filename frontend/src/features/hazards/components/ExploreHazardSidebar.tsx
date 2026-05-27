import { HazardType } from '@/types/hazards'
import { Box, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface ExploreHazardSidebarProps {
  enabledHazards: HazardType[]
  setEnabledHazards: React.Dispatch<React.SetStateAction<HazardType[]>>
  hazardQueryMap: any
  postsLoading: boolean
  showPosts: boolean
  setShowPosts: React.Dispatch<React.SetStateAction<boolean>>
}

function HazardLayerPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography component='h2'>{title}</Typography>
      {children}
    </Box>
  )
}

function HazardLayerItem({
  label,
  loading,
  isEnabled,
  onClick,
}: {
  label: string
  loading: boolean
  isEnabled: boolean
  onClick: () => void
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
      }}
    >
      <Typography
        component='span'
        variant='body2'
        sx={{ color: 'text.disabled' }}
      >
        {label}
      </Typography>
      <IconButton
        loading={loading}
        disabled={loading}
        onClick={onClick}
        sx={{ color: 'text.disabled' }}
      >
        {isEnabled ? (
          <RemoveIcon sx={{ fontSize: 20 }} />
        ) : (
          <AddIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Box>
  )
}

export default function ExploreHazardSidebar({
  setEnabledHazards,
  enabledHazards,
  hazardQueryMap,
  postsLoading,
  showPosts,
  setShowPosts,
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
          label='add post'
          loading={postsLoading}
          isEnabled={showPosts}
          onClick={() => setShowPosts((prev) => !prev)}
        />
      </HazardLayerPanel>
      <HazardLayerPanel title='Hazards'>
        {allHazards.map((hazardName) => (
          <HazardLayerItem
            label={hazardName}
            loading={hazardQueryMap[hazardName]?.isFetching}
            isEnabled={enabledHazards.includes(hazardName)}
            onClick={() => toggleHazard(hazardName)}
          />
        ))}
      </HazardLayerPanel>
    </Box>
  )
}
