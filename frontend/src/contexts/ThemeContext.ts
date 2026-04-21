import { useContext, createContext } from 'react'
import type { ThemeContextType } from '@/types/theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('useTheme has to be used within <themeContext.Provider>')
  }

  return themeContext
}

export default ThemeContext
