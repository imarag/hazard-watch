export interface CurrentUser {
  id: string
  email: string
}

export type AuthContextType = {
  currentUser: CurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
  isUserLoggedIn: boolean
  login: (credentials: UserLogin) => Promise<void>
  sendResetLink: (payload: UserForgotPassword) => Promise<void>
  resetPassword: (payload: UserResetPassword) => Promise<void>
  register: (userInfo: BaseUser) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  isLoggingOut: React.RefObject<boolean>
}

type BaseUser = {
  email: string
  password: string
  name: string
}

export type UserInDb = BaseUser & {
  id: string
}

export type UserPublic = Omit<BaseUser, 'password'> & {
  id: string
}

export type UserLogin = Omit<BaseUser, 'name'>

export type UserRegister = BaseUser

export type UserForgotPassword = Pick<BaseUser, 'email'>
export type UserResetPassword = {
  token: string | null
  newPassword: string
}

export type UserPayload = {
  id: string
  email: string
  tokenType: 'access' | 'refresh'
}

export type LoginResponse = {
  id: string
  email: string
  token: string
}
