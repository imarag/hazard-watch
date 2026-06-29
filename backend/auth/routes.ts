import express from 'express'
import type {
  UserLogin,
  UserRegister,
  UserUpdateInformation,
  UserUpdatePassword,
} from '../users/schema.ts'
import {
  UserForgotPasswordSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserResetPasswordSchema,
  UserUpdateInformationSchema,
  UserUpdatePasswordSchema,
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
import { AppError } from '../lib/errors.js'
import pool from '../db/db.ts'

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
      userId: userPayload.userId,
      tokenType: 'access',
    },
    config.ACCESS_TOKEN_DUR,
  )

  const existingUser = await usersService.getUserById(userPayload.userId)
  if (!existingUser) {
    throw new AppError(401, 'User not found')
  }

  return res.status(200).json({
    accessToken,
    user: {
      id: userPayload.userId,
      email: existingUser.email,
      name: existingUser.name,
    },
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

  const accessToken = createJWTToken(
    { userId: existingUser.id, tokenType: 'access' },
    config.ACCESS_TOKEN_DUR,
  )
  const refreshToken = createJWTToken(
    { userId: existingUser.id, tokenType: 'refresh' },
    config.REFRESH_TOKEN_DUR,
  )

  res.cookie(config.REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: config.REFRESH_TOKEN_DUR * 1000,
  })

  return res.status(200).json({
    accessToken,
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    },
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

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    payload.email,
  ])
  const user = result.rows[0] ?? null

  // Always return the same message to prevent email enumeration
  const genericResponse = {
    message: 'If this email exists, a reset link has been sent.',
  }

  if (!user) {
    return res.json(genericResponse)
  }

  const resetToken = createJWTToken(
    {
      userId: user.id,
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

router.put('/update-information', async (req, res) => {
  const body: UserUpdateInformation = req.body
  const user = UserUpdateInformationSchema.parse(body)

  const existingUser = await usersService.getUserById(req.userId!)
  if (!existingUser) {
    throw new AppError(401, 'Invalid user.')
  }

  const newUser = { ...existingUser, ...user }
  await usersService.updateUser(existingUser.id, newUser)

  return res.status(200).json({
    user: {
      id: existingUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  })
})

router.put('/change-password', async (req, res) => {
  const body: UserUpdatePassword = req.body
  const user = UserUpdatePasswordSchema.parse(body)

  const existingUser = await usersService.getUserById(req.userId!)
  if (!existingUser) {
    throw new AppError(401, 'Invalid user.')
  }
  console.log(user)
  if (!user.newPassword || !user.currentPassword) {
    throw new AppError(400, 'Current password and new password are required.')
  }

  if (user.currentPassword === user.newPassword) {
    throw new AppError(
      400,
      'New password cannot be the same as the current password.',
    )
  }

  const passwordMatch = await compareHashed(
    user.currentPassword,
    existingUser.password,
  )
  if (!passwordMatch) {
    throw new AppError(401, 'Invalid current password.')
  }

  existingUser.password = await hashPassword(user.newPassword)

  await usersService.updateUser(existingUser.id, existingUser)

  return res.status(200).json({ message: 'Password updated successfully' })
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

  await pool.query('UPDATE users SET password = $1 WHERE id = $2', [
    hashedPassword,
    decoded.userId,
  ])

  return res.json({ message: 'Password reset successful' })
})

export default router
