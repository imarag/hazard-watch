import { Box } from '@mui/material'
import ThemeSwitch from '@/components/ui/ThemeSwitch'
import NavigationBarItem from '@/components/layout/NavigationBarItem'
import { appRoutes } from '@/shared/constants/routes'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import SearchField from '@/components/layout/SearchField'
import UserAccountMenu from '@/components/layout/UserAccountMenu'
import { useAuthActions, useIsUserLoggedIn } from '@/features/auth/store'
import { useNavigate } from 'react-router'
import { useNotificationActions } from '@/shared/stores/notification'

export default function NavLinks() {
  const isUserLoggedIn = useIsUserLoggedIn()
  const { logout } = useAuthActions()
  const { showNotification, createNotification } = useNotificationActions()
  const navigate = useNavigate()

  async function handleLogoutUser() {
    await logout()
    showNotification(
      createNotification('You have successfully logged out.', 'success'),
    )
    navigate(appRoutes.home.path)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1,
        }}
      >
        <NavigationBarItem
          to={appRoutes.home.path}
          icon={<ArticleIcon />}
          label='Posts'
        />
        <NavigationBarItem
          to={appRoutes.map.path}
          icon={<MapIcon />}
          label='Map'
        />
        <NavigationBarItem
          to={appRoutes.about.path}
          icon={<PersonIcon />}
          label='About'
        />

        {!isUserLoggedIn && (
          <>
            <NavigationBarItem
              to={appRoutes.login.path}
              icon={<LoginRoundedIcon />}
              label='Login'
            />
            <NavigationBarItem
              to={appRoutes.register.path}
              icon={<AppRegistrationRoundedIcon />}
              label='Register'
            />
          </>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <SearchField />
      </Box>

      <Box
        sx={{
          marginInline: { md: 3 },
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'start',
            md: 'center',
          },
        }}
      >
        <ThemeSwitch />
      </Box>
      {isUserLoggedIn && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'start' },
          }}
        >
          <UserAccountMenu handleLogoutUser={handleLogoutUser} />
        </Box>
      )}
    </>
  )
}
