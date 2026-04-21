export type ThemeMode = 'light' | 'dark'

export type ThemeContextType = {
  themeMode: ThemeMode
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>
}
