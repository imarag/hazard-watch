import { Box, Divider, Link, IconButton } from '@mui/material'
import ThemeSwitch from '../ui/ThemeSwitch'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as LinkRouter, useNavigate } from 'react-router'
import NavigationBarItem from '@/components/structure/NavigationBarItem'
import { appRoutes } from '@/constants/routes'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import CloseIcon from '@mui/icons-material/Close'
import Logo from '@/components/structure/Logo'
import SearchField from '@/components/structure/SearchField'
import { useIsSidebarOpen, useSidebarActions } from '@/stores/sidenav'
import { useNotificationActions } from '@/stores/notification'
import { useIsUserLoggedIn, useAuthActions } from '@/stores/auth'

export default function NavigationBar() {
  const { logout } = useAuthActions()
  const isUserLoggedIn = useIsUserLoggedIn()
  const isSidebarOpen = useIsSidebarOpen()
  const { toggleSidebar } = useSidebarActions()
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
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: {
          xs: 'row',
          md: 'row',
          xl: 'column',
        },
        alignItems: 'center',
        paddingBlock: { xs: 1, xl: 4 },
        paddingInline: 4,
        overflow: 'hidden',
        width: { xs: '100%', xl: 350 },
        backgroundColor: 'background.paper',
        flexWrap: 'wrap',
        gap: { xs: 2, md: 4 },
      }}
    >
      <Link
        sx={{ fontSize: 'fontSize' }}
        component={LinkRouter}
        to={appRoutes.home.path}
        underline='none'
      >
        <Logo />
      </Link>
      <Box sx={{ display: 'flex', minWidth: 0, flex: { xs: 1, xl: 0 } }}>
        <SearchField />
      </Box>
      <Box
        sx={{
          flexGrow: { xl: 1 },
          display: { xs: isSidebarOpen ? 'flex' : 'none', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row', xl: 'column' },
          gap: 1,
          width: { xs: '100%', md: 'auto', xl: '100%' },
          order: { xs: 2, md: 1 },
          alignItems: 'stretch',
        }}
      >
        <Divider
          variant='middle'
          sx={{
            display: {
              xs: isSidebarOpen ? 'block' : 'none',
              md: 'none',
              xl: 'block',
            },
            marginBlock: 2,
          }}
        />
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

        <Divider
          variant='middle'
          sx={{
            display: {
              xs: isSidebarOpen ? 'block' : 'none',
              md: 'none',
              xl: 'block',
            },
            marginBlock: 2,
          }}
        />

        {isUserLoggedIn ? (
          <NavigationBarItem
            link={false}
            icon={<LogoutRoundedIcon />}
            label='Logout'
            onClick={handleLogoutUser}
          />
        ) : (
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
        <Divider
          variant='middle'
          sx={{
            display: {
              xs: isSidebarOpen ? 'block' : 'none',
              md: 'none',
              xl: 'block',
            },
            marginBlock: 2,
            marginTop: { xl: 'auto' },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            marginLeft: { md: 4, xl: 0 },
            justifyContent: {
              xs: 'center',
              sm: 'start',
              md: 'center',
            },
          }}
        >
          <ThemeSwitch />
        </Box>
      </Box>

      <IconButton
        aria-label='toggle sidebar'
        onClick={() => toggleSidebar()}
        sx={{ display: { md: 'none' }, padding: 0 }}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </Box>
  )
}
