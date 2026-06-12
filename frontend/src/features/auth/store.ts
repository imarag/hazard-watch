import { create } from 'zustand'
import type {
  User,
  UserLogin,
  UserRegister,
  UserForgotPassword,
  UserResetPassword,
} from '@/features/users/types'
import authService from '@/features/auth/services'
import { setToken } from '@/lib/api'

type State = {
  currentUser: User | null
  isLoggingOut: boolean
}

type Actions = {
  actions: {
    setCurrentUser: (user: User | null) => void
    setIsLoggingOut: (value: boolean) => void
    login: (credentials: UserLogin) => Promise<void>
    logout: () => Promise<void>
    register: (userInfo: UserRegister) => Promise<void>
    sendResetLink: (data: UserForgotPassword) => Promise<void>
    resetPassword: (data: UserResetPassword) => Promise<void>
    changePassword: (data: {
      currentPassword: string
      newPassword: string
    }) => Promise<void>
    updateInformation: (data: {
      name?: string
      email?: string
    }) => Promise<void>
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
        currentUser: res.user,
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

    changePassword: async (data: {
      currentPassword: string
      newPassword: string
    }) => {
      await authService.changePassword(data)
    },

    updateInformation: async (data: { name?: string }) => {
      const updatedUser = await authService.updateInformation(data)
      set((state) => ({
        currentUser: {
          ...state.currentUser,
          ...updatedUser.user,
        },
      }))
    },
  },
}))

export const useCurrentUser = () => useAuthStore((s) => s.currentUser)
export const useIsUserLoggedIn = () =>
  useAuthStore((s) => s.currentUser !== null)
export const useIsLoggingOut = () => useAuthStore((s) => s.isLoggingOut)
export const useAuthActions = () => useAuthStore((s) => s.actions)
