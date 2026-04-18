export type ThemeMode = 'light' | 'dark'

export type ThemeContext = {
  themeMode: ThemeMode
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>
}
