import { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { useThemeMode } from '@/stores/theme'
import config from '@/config'

interface AppThemeProviderProps {
  children: React.ReactNode
}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const themeMode = useThemeMode()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          background: {
            default: config.colors[themeMode].default,
            paper: config.colors[themeMode].paper,
          },
          primary: {
            main: config.colors[themeMode].primary,
          },
        },
      }),
    [themeMode],
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
