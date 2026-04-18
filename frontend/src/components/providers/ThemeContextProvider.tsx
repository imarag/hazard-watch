import { useState } from 'react'
import type { ThemeMode } from '@/types/theme'
import { createTheme, ThemeProvider } from '@mui/material'
import ThemeContext from '@/contexts/ThemeContext'
import useLocalStorage from '@/hooks/useLocalStorage'
import config from '@/config'

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const { getStorageItem } = useLocalStorage<ThemeMode>(config.themeStorageKey)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = getStorageItem()
    return (stored as ThemeMode) ?? config.initialThemeValue
  })
  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: config.colors[themeMode].default,
        paper: config.colors[themeMode].paper,
      },
    },
  })
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
