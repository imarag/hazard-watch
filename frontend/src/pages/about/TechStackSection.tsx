import { Box, Typography, Chip } from '@mui/material'
import { techStack } from '@/pages/about/constants'

export default function TechStackSection() {
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
        Tech Stack
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'start' },
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {techStack.map((tech) => (
          <Chip key={tech} label={tech} size='small' variant='outlined' />
        ))}
      </Box>
    </Box>
  )
}
