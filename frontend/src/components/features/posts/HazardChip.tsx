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
      icon={<HazardIcon style={{ fontSize: 14 }} />}
      sx={{
        backgroundColor: hazardInfo.backgroundColor,
        color: hazardInfo.color,
        ...sx,
      }}
      size='small'
    />
  )
}
