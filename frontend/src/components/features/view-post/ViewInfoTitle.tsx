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
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography
        variant='body1'
        sx={{
          fontWeight: 'fontWeightBold',
          order: { xs: 2, sm: 1 },
        }}
      >
        {title}
      </Typography>
      <HazardChip hazard={hazardType} />
    </Box>
  )
}
