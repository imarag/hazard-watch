import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          <SentimentDissatisfiedIcon
            sx={{ fontSize: 80, color: 'text.secondary' }}
          />
          <Typography variant='h1' sx={{ fontWeight: 'fontWeightBold' }}>
            404
          </Typography>
          <Typography variant='h5' color='text.secondary'>
            Page not found
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: 'secondary', maxWidth: 360 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant='contained'
            size='large'
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Go home
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
