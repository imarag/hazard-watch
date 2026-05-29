export type ErrorResponse = {
  message: string
  status: number
  errors: string[]
}

export type TokenPayload = {
  id: string
  userName: string
  email: string
  tokenType: 'access' | 'refresh' | 'reset'
}
