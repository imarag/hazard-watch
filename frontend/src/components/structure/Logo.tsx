import LogoLight from '@/assets/logo-light.svg'
import LogoDark from '@/assets/logo-dark.svg'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function Logo() {
  const theme = useTheme()
  const logoIcon = theme.palette.mode === 'dark' ? LogoLight : LogoDark
  return (
    <Box component='img' src={logoIcon} alt='Hazard App' sx={{ height: 64 }} />
  )
}
