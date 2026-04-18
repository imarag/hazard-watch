import { useContext, createContext } from 'react'
import type { ThemeContext } from '@/types/theme'

const ThemeContext = createContext<ThemeContext | undefined>(undefined)

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('useTheme has to be used within <themeContext.Provider>')
  }

  return themeContext
}

export default ThemeContext
