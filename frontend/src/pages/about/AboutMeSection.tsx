import { Box, Typography, Avatar, Button, Stack } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function AboutMeSection() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        padding: 3,
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'start' },
        gap: 2,
      }}
    >
      <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
        <Avatar
          sx={{
            width: 72,
            height: 72,
            fontSize: 24,
            bgcolor: 'primary.light',
          }}
        >
          GM
        </Avatar>
      </Box>
      <Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 'fontWeightBold',
            textAlign: { xs: 'center', sm: 'start' },
          }}
        >
          Giannis Maragkakis
        </Typography>
        <Typography
          sx={{ textAlign: { xs: 'center', sm: 'start' } }}
          variant='body2'
        >
          Full Stack Developer
        </Typography>
        <Stack direction='row' spacing={1} sx={{ marginTop: 1 }}>
          <Button
            component='a'
            href='https://www.linkedin.com/in/ioannis-maragkakis-1ba2851a9'
            target='_blank'
            size='small'
            variant='contained'
            startIcon={<LinkedInIcon />}
            color='info'
            disableElevation
          >
            LinkedIn
          </Button>
          <Button
            component='a'
            href='https://github.com/imarag/hazard-watch'
            target='_blank'
            size='small'
            variant='contained'
            color='inherit'
            disableElevation
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}