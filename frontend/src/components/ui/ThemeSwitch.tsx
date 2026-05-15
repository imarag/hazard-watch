import { Box, Switch } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeModeActions, useThemeMode } from '@/stores/theme'

export default function ThemeSwitch() {
  const themeMode = useThemeMode()
  const { setThemeMode } = useThemeModeActions()

  function handleChangeTheme() {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LightModeIcon fontSize='small' />
      <Switch checked={themeMode === 'dark'} onChange={handleChangeTheme} />
      <DarkModeIcon fontSize='small' />
    </Box>
  )
}
