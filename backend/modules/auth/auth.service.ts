import { AppError } from '../../lib/errors.ts'
import { compareHashed, verifyJWTToken } from './auth.utils.ts'
import {
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
  type UserUpdateInformation,
} from '../users/index.ts'
import type { UserLogin, UserRegister } from './auth.schemas.ts'
import { createJWTToken } from './auth.utils.ts'
import config from '../../lib/config.ts'
import { hashPassword } from './auth.utils.ts'
import type { Request } from 'express'
import { logger } from '../../lib/logger.ts'
import { sendMail } from '../../lib/mailer.ts'

export const register = async ({ email, password, name }: UserRegister) => {
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new AppError(409, 'User with that email already exists.')
  }

  const hashedPassword = await hashPassword(password)
  await createUser({ email, name, password: hashedPassword })
}

export const logout = async () => {}

export const login = async ({ email, password }: UserLogin) => {
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    throw new AppError(401, 'Invalid email or password.')
  }

  const passwordMatch = await compareHashed(password, existingUser.password)
  if (!passwordMatch) {
    throw new AppError(401, 'Invalid email or password.')
  }

  const accessToken = createJWTToken(
    { userId: existingUser.id, tokenType: 'access' },
    config.ACCESS_TOKEN_DUR,
  )
  const refreshToken = createJWTToken(
    { userId: existingUser.id, tokenType: 'refresh' },
    config.REFRESH_TOKEN_DUR,
  )

  return {
    accessToken,
    refreshToken,
    user: existingUser,
  }
}

export const refresh = async ({ refreshToken }: { refreshToken: string }) => {
  const userPayload = verifyJWTToken(refreshToken)
  if (!userPayload || userPayload.tokenType !== 'refresh') {
    throw new AppError(401, 'Invalid refresh token')
  }

  const accessToken = createJWTToken(
    {
      userId: userPayload.userId,
      tokenType: 'access',
    },
    config.ACCESS_TOKEN_DUR,
  )

  const existingUser = await getUserById(userPayload.userId)
  if (!existingUser) {
    throw new AppError(401, 'User not found')
  }
  return { accessToken, user: existingUser }
}

type UserInformationProps = {
  req: Request
  data: UserUpdateInformation
}

export const updateUserInformation = async ({
  req,
  data,
}: UserInformationProps) => {
  const existingUser = await getUserById(req.userId!)
  if (!existingUser) {
    throw new AppError(401, 'Invalid user.')
  }

  const newUser = { ...existingUser, ...data }
  await updateUser(existingUser.id, newUser)
  return {
    name: newUser.name,
    email: newUser.email,
    id: newUser.id,
  }
}

type ResetPasswordProps = {
  token: string
  password: string
}

export const resetPassword = async ({
  token,
  password,
}: ResetPasswordProps) => {
  const decoded = verifyJWTToken(token)

  if (!decoded) {
    throw new AppError(400, 'Invalid or expired token.')
  }

  const hashedPassword = await hashPassword(password)

  await updateUser(decoded.userId, { password: hashedPassword })
}

export async function requestPasswordReset(email: string): Promise<void> {
  const user = await getUserByEmail(email)
  if (!user) {
    return
  }

  const resetToken = createJWTToken(
    { userId: user.id, tokenType: 'reset' },
    '1h',
  )

  const clientHost =
    config.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : config.CLIENT_URL
  const resetLink = `${clientHost}/auth/reset-password?token=${resetToken}`

  try {
    await sendPasswordResetEmail(user.email, resetLink)
  } catch (err) {
    logger.error('Failed to send reset email:', err)
  }
}

function sendPasswordResetEmail(to: string, resetLink: string) {
  return sendMail({
    to,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset.</p>
      <a href="${resetLink}">Click here to reset your password</a>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    `,
  })
}

type ChangePasswordProps = {
  req: Request
  currentPassword?: string
  newPassword?: string
}

export const changePassword = async ({
  req,
  currentPassword,
  newPassword,
}: ChangePasswordProps) => {
  const existingUser = await getUserById(req.userId!)
  if (!existingUser) {
    throw new AppError(401, 'Invalid user.')
  }

  if (!newPassword || !currentPassword) {
    throw new AppError(400, 'Current password and new password are required.')
  }

  if (currentPassword === newPassword) {
    throw new AppError(
      400,
      'New password cannot be the same as the current password.',
    )
  }

  const passwordMatch = await compareHashed(
    currentPassword,
    existingUser.password,
  )
  if (!passwordMatch) {
    throw new AppError(401, 'Invalid current password.')
  }

  await updateUser(existingUser.id, {
    password: await hashPassword(newPassword),
  })
}
