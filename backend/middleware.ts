import type { Request, Response, NextFunction } from 'express'
import { verifyJWTToken } from './utils/auth.js'
import postService from './services/posts.js'
import { z } from 'zod'
import config from './config.js'
import axios from 'axios'
import { logger } from './utils/logger.js'
import { AppError } from './errors.js'

export const extractToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization
  if (
    authorization &&
    typeof authorization === 'string' &&
    authorization.startsWith('Bearer ')
  ) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.token) {
    throw new AppError(401, 'You must be logged in to use this option.')
  }

  const user = verifyJWTToken(req.token)

  if (!user) {
    throw new AppError(401, 'Invalid user. Log in again.')
  }

  req.userId = user.id
  req.userName = user.userName
  next()
}

export const requireOwnership = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const postId = String(req.params['id'])
  const existingPost = await postService.getPostById(postId)

  if (existingPost.user.id !== req.userId) {
    throw new AppError(403, 'Unauthorized')
  }

  next()
}

export const routeNotFound = (_req: Request, _res: Response) => {
  throw new AppError(404, 'Route not found')
}

const createErrorResponse = (code: number, message: string) => ({
  error: {
    code,
    message,
  },
})

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
   
  _next: NextFunction,
) => {
  logger.error(error)

  if (error instanceof z.ZodError) {
    const message = error.issues.map((i) => i.message).join(', ')
    return res.status(400).json(createErrorResponse(400, message))
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 502
    const message = error.response?.data?.message ?? 'External service error'
    return res.status(status).json(createErrorResponse(status, message))
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(createErrorResponse(error.statusCode, error.message))
  }

  const isProd = config.NODE_ENV === 'production'
  return res
    .status(500)
    .json(
      createErrorResponse(
        500,
        isProd ? 'Internal Server Error' : error.message,
      ),
    )
}
