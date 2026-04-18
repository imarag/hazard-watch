import { Box, Switch } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '@/contexts/ThemeContext'
import useLocalStorage from '@/hooks/useLocalStorage'
import type { ThemeMode } from '@/types/theme'
import config from '@/config'

export default function ThemeSwitch() {
  const { themeMode, setThemeMode } = useTheme()
  const { setStorageItem } = useLocalStorage<ThemeMode>(config.themeStorageKey)

  function handleChangeTheme() {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'
    setStorageItem(newTheme)
    setThemeMode(newTheme)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LightModeIcon fontSize='small' />
      <Switch checked={themeMode === 'dark'} onChange={handleChangeTheme} />
      <DarkModeIcon fontSize='small' />
    </Box>
  )
}
