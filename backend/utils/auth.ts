import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import type { UserPayload } from '../types/users.js'
import type { ErrorResponse } from '../types/auth.js'
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
  payload: UserPayload,
  expires: number | string = 60 * 60,
) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expires,
  } as SignOptions)
}

export const verifyJWTToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as UserPayload
  } catch {
    return null
  }
}

export const createErrorResponse = (
  status: number,
  message: string,
  errors: string[] = [],
): ErrorResponse => ({ status, message, errors })
