export type ErrorResponse = {
  message: string
  status: number
  errors: string[]
}

export type TokenPayload = {
  userId: string
  tokenType: 'access' | 'refresh' | 'reset'
}
