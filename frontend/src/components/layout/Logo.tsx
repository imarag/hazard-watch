import LogoLight from '@/assets/logo-light.svg'
import LogoDark from '@/assets/logo-dark.svg'
import { Box, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link as LinkRouter } from 'react-router'
import { appRoutes } from '@/shared/constants/routes'

export default function Logo() {
  const theme = useTheme()
  const logoIcon = theme.palette.mode === 'dark' ? LogoLight : LogoDark
  return (
    <Link
      sx={{ fontSize: 'fontSize' }}
      component={LinkRouter}
      to={appRoutes.home.path}
      underline='none'
    >
      <Box
        component='img'
        src={logoIcon}
        alt='Hazard App'
        sx={{ height: 50 }}
      />
    </Link>
  )
}
