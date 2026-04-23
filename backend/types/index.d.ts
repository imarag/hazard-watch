declare namespace Express {
  export interface Request {
    token?: string | null
    userId?: string | null
    userName?: string | null
  }
}
