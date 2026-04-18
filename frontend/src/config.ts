import type { ThemeMode } from '@/types/theme'

const initialThemeValue: ThemeMode = 'dark'
const themeStorageKey = 'theme'

const config = {
  initialThemeValue,
  themeStorageKey,
  colors: {
    dark: {
      default: '#1d232a',
      paper: '#191e24',
      primary: '#a6adbb',
      secondary: '#374151',
    },
    light: {
      default: '#f8f8f8',
      paper: '#ffffff',
      primary: '#18181b',
      secondary: '#e5e6e6',
    },
  },
}

export default config
