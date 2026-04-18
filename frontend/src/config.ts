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
    },
    light: {
      default: 'white',
      paper: '#f5f5f5',
    },
  },
}

export default config
