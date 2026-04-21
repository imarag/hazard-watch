import { Box, Divider, Typography } from '@mui/material'
import ThemeSwitch from '../ui/ThemeSwitch'
import { useAuth } from '@/contexts/AuthContext'
import SideNavItem from './SideNavItem'
import { appRoutes } from '@/constants/routes'
import ArticleIcon from '@mui/icons-material/Article'
import MapIcon from '@mui/icons-material/Map'
import PersonIcon from '@mui/icons-material/Person'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

export default function SideNav() {
  const { isUserLoggedIn, logout } = useAuth()

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingInline: 2,
      }}
    >
      <Box sx={{ paddingBlock: 2 }}>
        <Typography variant='h6' align='center'>
          HAZARD
        </Typography>
        <Typography variant='h6' align='center'>
          WATCH
        </Typography>
      </Box>

      <Divider variant='middle' sx={{ marginBottom: 2 }} />

      <Box
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
      >
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

        <Divider variant='middle' sx={{ marginBlock: 2 }} />

        {isUserLoggedIn ? (
          <SideNavItem
            link={false}
            icon={<LogoutRoundedIcon />}
            label='Logout'
            onClick={logout}
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
      </Box>

      <Divider variant='middle' sx={{ marginTop: 2 }} />

      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ThemeSwitch />
      </Box>
    </Box>
  )
}
