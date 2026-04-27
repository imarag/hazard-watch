import type { Request, Response, NextFunction } from 'express'
import { verifyJWTToken } from './utils/auth.js'
import postService from './services/posts.js'
import { z } from 'zod'
import config from './config.js'
import { createErrorResponse } from './utils/auth.js'
import axios from 'axios'

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
  res: Response,
  next: NextFunction,
) => {
  if (!req.token) {
    return res
      .status(401)
      .json(
        createErrorResponse(401, 'You must be logged in to use this option.'),
      )
  }
  console.log('Token exists: ', req.token)
  const user = verifyJWTToken(req.token)
  console.log('Token valid: ', user)
  if (!user) {
    return res
      .status(401)
      .json(createErrorResponse(401, 'Invalid user. Log in again.'))
  }

  req.userId = user.id
  req.userName = user.userName
  return next()
}

export const requireOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = String(req.params['id'])
  const existingPost = await postService.getPostById(postId)

  if (!existingPost) {
    return res.status(404).json(createErrorResponse(404, 'Post not found'))
  }

  if (existingPost.user.id !== req.userId) {
    return res.status(403).json(createErrorResponse(403, 'Unauthorized'))
  }

  return next()
}

export const routeNotFound = (_req: Request, res: Response) => {
  return res.status(404).json(createErrorResponse(404, 'Route not found'))
}

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error)

  if (error instanceof z.ZodError) {
    return res.status(400).json(
      createErrorResponse(
        400,
        'Validation failed',
        error.issues.map((i) => i.message),
      ),
    )
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 502
    const message = error.response?.data?.message ?? 'External service error'
    return res.status(status).json(createErrorResponse(status, message))
  }

  const isProd = config.NODE_ENV === 'production'
  return res
    .status(500)
    .json(
      createErrorResponse(
        500,
        'Internal Server Error',
        isProd ? [] : [error.message],
      ),
    )
}
