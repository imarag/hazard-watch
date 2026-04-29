import { Box } from '@mui/material'

interface ActionBarProps {
  children: React.ReactNode
}

export default function ActionBar({ children }: ActionBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        marginBottom: 4,
      }}
    >
      {children}
    </Box>
  )
}
