import type { Request, Response, NextFunction } from 'express'
import { verifyJWTToken } from './utils/auth.ts'
import postService from './services/posts.ts'

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
  const token = req.token

  if (!token) {
    return res
      .status(401)
      .json({ error: 'You must be logged in to use this option.' })
  }

  const user = verifyJWTToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Invalid user. Log in again.' })
  }

  req.userId = user.id
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
    return res.status(404).json({ error: 'Post not found' })
  }

  if (existingPost.userId !== req.userId) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  return next()
}
