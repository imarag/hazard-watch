import { Box, Container, Stack, Typography } from '@mui/material'
import { usePageRoute } from '@/hooks/usePageRoute'
import { useAuth } from '@/contexts/AuthContext'
import { authRequiredActions } from '@/constants/routes'

export default function TopBar() {
  const { isUserLoggedIn } = useAuth()
  const currentRoute = usePageRoute()

  const visibleActions = isUserLoggedIn
    ? currentRoute.actions
    : currentRoute.actions.filter(
        (Action) => !authRequiredActions.includes(Action),
      )

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <Container
        fixed
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: { xs: 1, md: 2 },
          display: 'flex',
          alignItems: 'center',
          paddingBlock: 2,
          gap: 2,
        }}
      >
        <Typography>{currentRoute.pageTitle}</Typography>
        <Stack sx={{ marginLeft: 'auto' }} direction='row' spacing={1}>
          {visibleActions.map((Action) => (
            <Action />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
