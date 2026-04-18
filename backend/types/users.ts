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

export type UserPayload = {
  id: string
  email: string
  tokenType: 'access' | 'refresh'
}
