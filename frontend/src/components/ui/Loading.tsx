import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingProps {
  text: string
}

export default function Loading({ text }: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {text}
        <CircularProgress aria-label='Loading…' />
      </Box>
    </Box>
  )
}
