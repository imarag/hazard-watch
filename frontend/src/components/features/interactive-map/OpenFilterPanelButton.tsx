import FilterListIcon from '@mui/icons-material/FilterList'
import MapButton from '@/components/features/map/MapButton'
import type { MapPosition } from '@/types/map'
import { Box } from '@mui/material'
import { getPositionProps } from '@/constants/map'

interface OpenFilterPanelButtonProps {
  onClick: () => void
  position: MapPosition
}

export default function OpenFilterPanelButton({
  onClick,
  position,
}: OpenFilterPanelButtonProps) {
  const positionProps = getPositionProps(position)

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      className={positionProps.className}
      style={positionProps.style}
    >
      <MapButton onClick={onClick} icon={<FilterListIcon />} />
    </Box>
  )
}
