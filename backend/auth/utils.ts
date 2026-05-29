import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../lib/config.ts'
import type { TokenPayload } from './types.ts'
import type { SignOptions } from 'jsonwebtoken'

export const hashPassword = async (password: string, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds)
}

export const compareHashed = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export const createJWTToken = (
  payload: TokenPayload,
  expires: number | string,
) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expires,
  } as SignOptions)
}

export const verifyJWTToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as TokenPayload
  } catch {
    return null
  }
}
