import { Chip, type SxProps } from '@mui/material'
import { HazardType } from '@/types/hazards'
import { hazardMeta } from '@/constants/hazards'

interface HazardChipProps {
  hazard: HazardType
  sx?: SxProps
}

export default function HazardChip({ hazard, sx }: HazardChipProps) {
  const hazardInfo = hazardMeta[hazard]
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
