import express from 'express'
import type { UserLogin, UserRegister } from '../types/user.ts'
import { UserLoginSchema, UserRegisterSchema } from '../models/user.ts'
import { createUser, getUserByEmail } from '../services/user.ts'
import {
  compareHashed,
  verifyJWTToken,
  createJWTToken,
  hashPassword,
} from '../utils/auth.ts'
import config from '../config.ts'

const router = express.Router()

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.get(config.REFRESH_TOKEN_KEY)

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' })
  }

  const userPayload = verifyJWTToken(refreshToken)

  if (!userPayload || userPayload.tokenType !== 'refresh') {
    return res.status(401).json({ error: 'Invalid refresh token' })
  }

  const accessToken = createJWTToken(
    {
      id: userPayload.id,
      email: userPayload.email,
      tokenType: 'access',
    },
    '15m',
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

  const existingUser = await getUserByEmail(user.email)

  if (!existingUser) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const passwordMatch = await compareHashed(
    user.password,
    existingUser.password,
  )

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const userPayload = { email: existingUser.email, id: existingUser.id }

  const accessToken = createJWTToken(
    { ...userPayload, tokenType: 'access' },
    '15m',
  )
  const refreshToken = createJWTToken(
    { ...userPayload, tokenType: 'refresh' },
    '7d',
  )

  res.cookie(config.REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
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

  const existingUser = await getUserByEmail(user.email)

  if (existingUser) {
    return res
      .status(401)
      .json({ error: 'User with that email already exists.' })
  }

  const hashedPassword = await hashPassword(user.password)

  await createUser({ ...user, password: hashedPassword })

  return res.status(201).json({ message: 'User created succesfully' })
})

router.post('/logout', (_req, res) => {
  res.clearCookie(config.REFRESH_TOKEN_KEY, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  })

  return res.status(200).json({ message: 'Logged out' })
})

export default router
