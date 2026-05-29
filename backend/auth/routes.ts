import express from 'express'
import type { UserLogin, UserRegister } from '../users/schema.ts'
import {
  UserForgotPasswordSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserResetPasswordSchema,
} from '../users/schema.ts'
import usersService from '../users/services.ts'
import {
  compareHashed,
  verifyJWTToken,
  createJWTToken,
  hashPassword,
} from '../auth/utils.ts'
import config from '../lib/config.js'
import { sendMail } from '../lib/mailer.js'
import { logger } from '../lib/logger.js'
import { AppError } from '../errors.js'
import { prisma } from '../lib/prisma.ts'

const router = express.Router()

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies?.[config.REFRESH_TOKEN_KEY]

  if (!refreshToken) {
    throw new AppError(401, 'No refresh token')
  }

  const userPayload = verifyJWTToken(refreshToken)
  if (!userPayload || userPayload.tokenType !== 'refresh') {
    throw new AppError(401, 'Invalid refresh token')
  }

  const accessToken = createJWTToken(
    {
      id: userPayload.id,
      userName: userPayload.userName,
      email: userPayload.email,
      tokenType: 'access',
    },
    config.ACCESS_TOKEN_DUR,
  )

  return res.status(200).json({
    id: userPayload.id,
    email: userPayload.email,
    token: accessToken,
  })
})

router.post('/login', async (req, res) => {
  const body: UserLogin = req.body
  const user = UserLoginSchema.parse(body)

  const existingUser = await usersService.getUserByEmail(user.email)
  if (!existingUser) {
    throw new AppError(401, 'Invalid email or password.')
  }

  const passwordMatch = await compareHashed(
    user.password,
    existingUser.password,
  )
  if (!passwordMatch) {
    throw new AppError(401, 'Invalid email or password.')
  }

  const userPayload = {
    email: existingUser.email,
    id: existingUser.id,
    userName: existingUser.name,
  }

  const accessToken = createJWTToken(
    { ...userPayload, tokenType: 'access' },
    config.ACCESS_TOKEN_DUR,
  )
  const refreshToken = createJWTToken(
    { ...userPayload, tokenType: 'refresh' },
    config.REFRESH_TOKEN_DUR,
  )

  res.cookie(config.REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: config.REFRESH_TOKEN_DUR * 1000,
  })

  return res.status(200).json({
    id: existingUser.id,
    email: existingUser.email,
    token: accessToken,
  })
})

router.post('/register', async (req, res) => {
  const body: UserRegister = req.body
  const user = UserRegisterSchema.parse(body)

  const existingUser = await usersService.getUserByEmail(user.email)
  if (existingUser) {
    throw new AppError(409, 'User with that email already exists.')
  }

  const hashedPassword = await hashPassword(user.password)
  await usersService.createUser({ ...user, password: hashedPassword })

  return res.status(201).json({ message: 'User created successfully' })
})

router.post('/logout', (_req, res) => {
  res.clearCookie(config.REFRESH_TOKEN_KEY, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  })
  return res.status(200).json({ message: 'Logged out' })
})

router.post('/forgot-password', async (req, res) => {
  const body = req.body
  const payload = UserForgotPasswordSchema.parse(body)

  const user = await prisma.user.findUnique({ where: { email: payload.email } })

  // Always return the same message to prevent email enumeration
  const genericResponse = {
    message: 'If this email exists, a reset link has been sent.',
  }

  if (!user) {
    return res.json(genericResponse)
  }

  const resetToken = createJWTToken(
    {
      id: user.id,
      userName: user.name,
      email: user.email,
      tokenType: 'reset',
    },
    '1h',
  )

  const clientHost =
    config.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : config.CLIENT_URL

  const resetLink = `${clientHost}/auth/reset-password?token=${resetToken}`

  try {
    await sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset.</p>
        <a href="${resetLink}">Click here to reset your password</a>
        <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      `,
    })
  } catch (err) {
    logger.error('Failed to send reset email:', err)
  }

  return res.json(genericResponse)
})

router.post('/reset-password', async (req, res) => {
  const body = req.body

  const payload = UserResetPasswordSchema.parse(body)

  const decoded = verifyJWTToken(payload.token)

  if (!decoded) {
    throw new AppError(400, 'Invalid or expired token.')
  }

  // Make sure this is a reset token, not a regular auth token
  if (decoded.tokenType !== 'reset') {
    throw new AppError(400, 'Invalid token type.')
  }

  const hashedPassword = await hashPassword(payload.newPassword)

  await prisma.user.update({
    where: { id: decoded.id },
    data: { password: hashedPassword },
  })

  return res.json({ message: 'Password reset successful' })
})

export default router
