import { Box, Divider, Link, IconButton, TextField } from '@mui/material'
import ThemeSwitch from '../ui/ThemeSwitch'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '@/contexts/AuthContext'
import { Link as LinkRouter } from 'react-router'
import NavigationBarItem from '@/components/structure/NavigationBarItem'
import { appRoutes } from '@/constants/routes'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useNotification } from '@/contexts/NotificationContext'
import { useNavigate } from 'react-router'
import { useSideNav } from '@/contexts/SideNavContext'
import CloseIcon from '@mui/icons-material/Close'
import Logo from '@/components/structure/Logo'
import SearchField from '@/components/structure/SearchField'

export default function NavigationBar() {
  const { isUserLoggedIn, logout } = useAuth()
  const { showSideNav, setShowSideNav } = useSideNav()
  const { showNotification, createNotification } = useNotification()
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
        paddingBlock: 2,
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
          display: { xs: showSideNav ? 'flex' : 'none', md: 'flex' },
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
              xs: showSideNav ? 'block' : 'none',
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
              xs: showSideNav ? 'block' : 'none',
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
              xs: showSideNav ? 'block' : 'none',
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
        onClick={() => setShowSideNav((prev) => !prev)}
        sx={{ display: { md: 'none' }, padding: 0 }}
      >
        {showSideNav ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </Box>
  )
}
