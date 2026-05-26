import { Container, Box, Stack } from '@mui/material'
import AboutMeSection from '@/pages/about/AboutMeSection'
import AboutProjectSection from '@/pages/about/AboutProjectSection'
import TechStackSection from '@/pages/about/TechStackSection'

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
