import type { Request, Response, NextFunction } from 'express'
import { verifyJWTToken } from './auth/utils.js'
import { getPostById } from './posts/services.js'
import { z } from 'zod'
import config from './lib/config.js'
import axios from 'axios'
import { logger } from './lib/logger.js'
import { AppError } from './lib/errors.js'
import { snakeToCamelCase } from './lib/utils.js'

export const extractToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization

  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    const payload = verifyJWTToken(token)
    if (payload) {
      req['userId'] = payload.userId
    }
  }
  next()
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.userId) {
    throw new AppError(401, 'You must be logged in to use this option.')
  }
  next()
}

export const requireOwnership = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const postId = String(req.params['id'])
  const existingPost = await getPostById(postId)

  if (existingPost.author.id !== req['userId']) {
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

function transformKeysToCamel(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [snakeToCamelCase(key), value]),
  )
}

export function camelCaseQueryTransformer(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const transformed = transformKeysToCamel(req.query as Record<string, unknown>)
  Object.defineProperty(req, 'query', {
    value: transformed,
    writable: true,
    configurable: true,
  })
  next()
}
