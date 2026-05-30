import { Box, Typography } from '@mui/material'
import { aboutApp } from '@/pages/about/constants'

export default function AboutProjectSection() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        padding: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 'fontWeightBold',
          marginBottom: 1,
          textAlign: { xs: 'center', sm: 'start' },
        }}
      >
        About this project
      </Typography>
      <Typography
        variant='body2'
        sx={{
          fontWeight: 'fontWeightLight',
          textAlign: { xs: 'center', sm: 'start' },
        }}
        color='text.secondary'
      >
        {aboutApp}
      </Typography>
    </Box>
  )
}
