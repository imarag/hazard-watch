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
        gap: 2,
        marginBlock: 2,
        paddingInline: 2,
      }}
    >
      {children}
    </Box>
  )
}
