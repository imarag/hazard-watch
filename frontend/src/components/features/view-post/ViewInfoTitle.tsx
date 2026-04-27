import { Typography, Box } from '@mui/material'
import type { HazardType } from '@/types/hazards'
import HazardChip from '@/components/features/posts/HazardChip'

interface ViewInfoTitleProps {
  title: string
  hazardType: HazardType
}

export default function ViewInfoTitle({
  title,
  hazardType,
}: ViewInfoTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: 'fontWeightBold',
        }}
      >
        {title}
      </Typography>
      <HazardChip hazard={hazardType} />
    </Box>
  )
}
