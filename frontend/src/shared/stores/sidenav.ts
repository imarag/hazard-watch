import { create } from 'zustand'

type State = {
  isSidebarOpen: boolean
}

type Actions = {
  actions: {
    toggleSidebar: () => void
    openSidebar: () => void
    closeSidebar: () => void
  }
}

const useSidebarStore = create<State & Actions>((set) => ({
  isSidebarOpen: false,
  actions: {
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
  },
}))

export const useIsSidebarOpen = () => useSidebarStore((s) => s.isSidebarOpen)
export const useSidebarActions = () => useSidebarStore((s) => s.actions)
