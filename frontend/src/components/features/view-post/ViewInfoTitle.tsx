import { Typography, Box, Chip } from '@mui/material'
import { hazardIconMapping } from '@/icons'
import type { HazardType } from '@/types/hazards'

interface ViewInfoTitleProps {
  title: string
  hazardType: HazardType
}

export default function ViewInfoTitle({
  title,
  hazardType,
}: ViewInfoTitleProps) {
  const Icon = hazardIconMapping[hazardType]
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
      <Chip
        label={hazardType}
        icon={<Icon style={{ fontSize: 14 }} />}
        color='primary'
        size='small'
      />
    </Box>
  )
}
