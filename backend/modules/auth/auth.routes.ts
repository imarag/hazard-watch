import express from 'express'
import type { Request, Response } from 'express'
import {
  type UserLogin,
  type UserRegister,
  UserLoginSchema,
  UserForgotPasswordSchema,
  UserRegisterSchema,
  UserResetPasswordSchema,
  UserUpdatePasswordSchema,
} from './auth.schemas.js'
import {
  changePassword,
  login,
  refresh,
  register,
  resetPassword,
  requestPasswordReset,
  updateUserInformation,
} from './auth.service.js'
import { setRefreshCookie } from './auth.utils.js'
import config from '../../lib/config.js'
import { UserUpdateInformationSchema } from '../users/index.js'

const router = express.Router()

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies?.[config.REFRESH_TOKEN_KEY]

  const { accessToken, user } = await refresh({ refreshToken })

  return res.status(200).json({
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })
})

router.post('/login', async (req: Request, res: Response) => {
  const body: UserLogin = req.body
  const payload = UserLoginSchema.parse(body)

  const { accessToken, refreshToken, user } = await login({
    email: payload.email,
    password: payload.password,
  })

  setRefreshCookie(res, refreshToken)
  return res.json({ accessToken, user })
})

router.post('/register', async (req, res) => {
  const body: UserRegister = req.body
  const payload = UserRegisterSchema.parse(body)

  await register({
    email: payload.email,
    password: payload.password,
    name: payload.name,
  })

  return res.status(201).json({ message: 'User created successfully' })
})

router.post('/logout', (_req, res) => {
  res.clearCookie(config.REFRESH_TOKEN_KEY, config.REFRESH_COOKIE_OPTIONS)
  return res.status(200).json({ message: 'Logged out' })
})

router.post('/forgot-password', async (req, res) => {
  const payload = UserForgotPasswordSchema.parse(req.body)
  await requestPasswordReset(payload.email)
  return res.json({
    message: 'If this email exists, a reset link has been sent.',
  })
})

router.put('/update-information', async (req, res) => {
  const payload = UserUpdateInformationSchema.parse(req.body)

  const { name, email, id } = await updateUserInformation({
    req: req,
    data: payload,
  })

  return res.status(200).json({
    user: {
      id: id,
      email: email,
      name: name,
    },
  })
})

router.put('/change-password', async (req: Request, res: Response) => {
  const payload = UserUpdatePasswordSchema.parse(req.body)

  await changePassword({
    req: req,
    currentPassword: payload.currentPassword,
    newPassword: payload.newPassword,
  })

  return res.status(200).json({ message: 'Password updated successfully' })
})

router.post('/reset-password', async (req, res) => {
  const payload = UserResetPasswordSchema.parse(req.body)

  await resetPassword({ token: payload.token, password: payload.newPassword })

  return res.json({ message: 'Password reset successful' })
})

export default router
