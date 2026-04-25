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
import { appRoutes } from '@/constants/routes'
import { techStack, aboutApp } from '@/constants/about'
import type { SxProps } from '@mui/material'
import PageLayout from '@/components/layouts/PageLayout'

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
      <Typography
        variant='subtitle2'
        sx={{ fontWeight: 'fontWeightBold', marginBottom: 1 }}
      >
        <SectionTitle title='Teck Stack' />
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
        sx={{ fontWeight: 'fontWeightLight' }}
        color='text.secondary'
      >
        {aboutApp}
      </Typography>
    </SectionContainer>
  )
}

function AboutMeSection() {
  return (
    <SectionContainer sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <InitialsAvatar />
      <Box>
        <Typography variant='h6' sx={{ fontWeight: 'fontWeightBold' }}>
          Giannis Maragkakis
        </Typography>
        <Typography variant='body2'>Full Stack Developer</Typography>
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
    <PageLayout pageTitle={appRoutes.about.pageTitle}>
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <AboutMeSection />
          <AboutProjectSection />
          <TechStackSection />
        </Stack>
      </Container>
    </PageLayout>
  )
}
