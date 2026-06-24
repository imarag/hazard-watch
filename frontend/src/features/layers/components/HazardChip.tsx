import { Chip, type SxProps } from '@mui/material'
import { HazardType } from '@/features/layers/types'
import { layerMeta } from '@/features/layers/constants'

interface HazardChipProps {
  hazard: HazardType
  sx?: SxProps
}

export default function HazardChip({ hazard, sx }: HazardChipProps) {
  const hazardInfo = layerMeta[hazard]
  const HazardIcon = hazardInfo.muiIcon
  return (
    <Chip
      label={hazard}
      icon={<HazardIcon />}
      sx={{
        backgroundColor: hazardInfo.backgroundColor,
        ...sx,
        '& .MuiChip-icon': {
          color: 'text.primary',
          fontSize: 14,
        },
      }}
      size='small'
    />
  )
}
