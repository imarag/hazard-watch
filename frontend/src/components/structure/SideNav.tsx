import { Box, Divider, Typography, IconButton } from '@mui/material'
import ThemeSwitch from '../ui/ThemeSwitch'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '@/contexts/AuthContext'
import SideNavItem from './SideNavItem'
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

export default function SideNav() {
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        overflow: 'hidden',
        width: { xs: '100%', xl: 350 },
        backgroundColor: 'background.paper',
        flexWrap: 'wrap',
      }}
    >
      <Typography variant='h6' align='center'>
        HAZARD WATCH
      </Typography>

      <Box
        sx={{
          flexGrow: { xl: 1 },
          display: { xs: showSideNav ? 'flex' : 'none', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row', xl: 'column' },
          gap: 1,
          width: { xs: '100%', md: 'auto' },
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
        <SideNavItem
          to={appRoutes.home.path}
          icon={<ArticleIcon />}
          label='Posts'
        />
        <SideNavItem to={appRoutes.map.path} icon={<MapIcon />} label='Map' />
        <SideNavItem
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
          <SideNavItem
            link={false}
            icon={<LogoutRoundedIcon />}
            label='Logout'
            onClick={handleLogoutUser}
          />
        ) : (
          <>
            <SideNavItem
              to={appRoutes.login.path}
              icon={<LoginRoundedIcon />}
              label='Login'
            />
            <SideNavItem
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
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'start', md: 'center' },
            marginLeft: { md: 4, xl: 0 },
          }}
        >
          <ThemeSwitch />
        </Box>
      </Box>

      <IconButton
        aria-label='toggle sidebar'
        onClick={() => setShowSideNav((prev) => !prev)}
        sx={{ display: { md: 'none' }, marginLeft: 2 }}
      >
        {showSideNav ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </Box>
  )
}
