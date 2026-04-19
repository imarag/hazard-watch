import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Stack,
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

const techStack = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'Material UI',
  'Leaflet',
  'JWT Auth',
  'REST API',
]

export default function About() {
  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            padding: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'background.paper',
          }}
        >
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
          <Box>
            <Typography variant='h6'>Giannis Maragkakis</Typography>
            <Typography variant='body2' color='text.secondary'>
              Full Stack Developer
            </Typography>
            <Stack direction='row' spacing={1} sx={{ marginTop: 1 }}>
              <Button
                component='a'
                href='www.linkedin.com/in/ioannis-maragkakis-1ba2851a9'
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
            variant='subtitle2'
            sx={{
              fontWeight: 'fontWeightBold',
              marginBottom: 1,
            }}
          >
            About this project
          </Typography>
          <Typography
            variant='body2'
            sx={{ fontWeight: 'fontWeightLight' }}
            color='text.secondary'
          >
            Hazard Watch is a hazard reporting platform that allows users to
            report and track natural disasters on an interactive map. Built as a
            portfolio project to demonstrate full stack development skills.
          </Typography>
        </Box>

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
            variant='subtitle2'
            sx={{ fontWeight: 'fontWeightBold', marginBottom: 1 }}
          >
            Teck Stack
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {techStack.map((tech) => (
              <Chip key={tech} label={tech} size='small' variant='outlined' />
            ))}
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}
