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
import { techStack, aboutApp } from '@/constants/about'
import type { SxProps } from '@mui/material'

function SectionContainer({
  sx,
  children,
}: {
  sx?: SxProps
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        padding: 3,
        backgroundColor: 'background.paper',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Typography
      variant='subtitle1'
      sx={{
        fontWeight: 'fontWeightBold',
        marginBottom: 1,
        textAlign: { xs: 'center', sm: 'start' },
      }}
    >
      {title}
    </Typography>
  )
}

function LinkedInButton() {
  return (
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
  )
}

function GitHubAction() {
  return (
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
  )
}

function InitialsAvatar() {
  return (
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
  )
}

function TechStackSection() {
  return (
    <SectionContainer>
      <SectionTitle title='Teck Stack' />
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
    </SectionContainer>
  )
}

function AboutProjectSection() {
  return (
    <SectionContainer>
      <SectionTitle title='About this project' />
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
    </SectionContainer>
  )
}

function AboutMeSection() {
  return (
    <SectionContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'start' },
        gap: 2,
      }}
    >
      <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
        <InitialsAvatar />
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
          <LinkedInButton />
          <GitHubAction />
        </Stack>
      </Box>
    </SectionContainer>
  )
}

export default function About() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth='sm' disableGutters>
        <Stack spacing={{ xs: 1, sm: 2 }}>
          <AboutMeSection />
          <AboutProjectSection />
          <TechStackSection />
        </Stack>
      </Container>
    </Box>
  )
}
