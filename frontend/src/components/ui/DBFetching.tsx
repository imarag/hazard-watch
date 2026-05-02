import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingProps {
  text?: string
}

export default function DBFetching({ text = 'saving' }: LoadingProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#00000080',
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
          padding: 2,
        }}
      >
        {text}...
        <CircularProgress aria-label='Loading…' />
      </Box>
    </Box>
  )
}
