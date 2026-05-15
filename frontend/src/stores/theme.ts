import { create } from 'zustand'
import type { ThemeMode } from '@/types/theme'
import { persist, createJSONStorage } from 'zustand/middleware'
import config from '@/config'

type State = {
  themeMode: ThemeMode
}

type Action = {
  actions: {
    setThemeMode: (theme: State['themeMode']) => void
  }
}

const useThemeModeStore = create<State & Action>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      actions: {
        setThemeMode: (theme) => set({ themeMode: theme }),
      },
    }),
    {
      name: config.themeStorageKey, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ themeMode: state.themeMode }), // (optional) only persist part of the state
    },
  ),
)

export const useThemeMode = () => useThemeModeStore((state) => state.themeMode)
export const useThemeModeActions = () =>
  useThemeModeStore((state) => state.actions)
