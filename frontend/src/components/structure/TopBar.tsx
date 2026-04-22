import { Box, Container, Stack, Typography } from '@mui/material'

interface TopBarProps {
  title: string
  children?: React.ReactNode
}

export default function TopBar({ title, children }: TopBarProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        alignItems: 'center',
        paddingBlock: 2,
      }}
    >
      <Container
        fixed
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1'>{title}</Typography>
        <Stack sx={{ marginLeft: 'auto' }} direction='row' spacing={1}>
          {children}
        </Stack>
      </Container>
    </Box>
  )
}
