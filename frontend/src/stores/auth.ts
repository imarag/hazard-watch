import { create } from 'zustand'
import type {
  CurrentUser,
  UserLogin,
  UserRegister,
  UserForgotPassword,
  UserResetPassword,
} from '@/types/users'
import authService from '@/services/auth'
import { setToken } from '@/services/api'

type State = {
  currentUser: CurrentUser | null
  isLoggingOut: boolean
}

type Actions = {
  actions: {
    setCurrentUser: (user: CurrentUser | null) => void
    setIsLoggingOut: (value: boolean) => void
    login: (credentials: UserLogin) => Promise<void>
    logout: () => Promise<void>
    register: (userInfo: UserRegister) => Promise<void>
    sendResetLink: (data: UserForgotPassword) => Promise<void>
    resetPassword: (data: UserResetPassword) => Promise<void>
  }
}

const useAuthStore = create<State & Actions>((set) => ({
  currentUser: null,
  isLoggingOut: false,
  actions: {
    setCurrentUser: (user) => set({ currentUser: user }),
    setIsLoggingOut: (value) => set({ isLoggingOut: value }),

    login: async (credentials) => {
      const res = await authService.login(credentials)
      setToken(res.token)
      set({
        currentUser: { id: res.id, email: res.email },
        isLoggingOut: false,
      })
    },

    logout: async () => {
      set({ isLoggingOut: true })
      await authService.logout()
      setToken(null)
      set({ currentUser: null })
    },

    register: async (userInfo) => {
      await authService.register(userInfo)
    },

    sendResetLink: async (data) => {
      await authService.sendResetLink(data)
    },

    resetPassword: async (data) => {
      await authService.resetPassword(data)
    },
  },
}))

export const useCurrentUser = () => useAuthStore((s) => s.currentUser)
export const useIsUserLoggedIn = () =>
  useAuthStore((s) => s.currentUser !== null)
export const useIsLoggingOut = () => useAuthStore((s) => s.isLoggingOut)
export const useAuthActions = () => useAuthStore((s) => s.actions)
