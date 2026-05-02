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
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <HazardChip
        sx={{ display: { xs: 'flex', sm: 'none' } }}
        hazard={hazardType}
      />
      <Typography
        variant='body1'
        sx={{
          fontWeight: 'fontWeightBold',
        }}
      >
        {title}
      </Typography>
      <HazardChip
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        hazard={hazardType}
      />
    </Box>
  )
}
