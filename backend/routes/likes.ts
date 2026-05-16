import express from 'express'
import { requireAuth } from '../middleware.js'
import { createLike, deleteLike } from '../services/likes.ts'

const router = express.Router({ mergeParams: true })

router.post('/', requireAuth, async (req, res) => {
  const postId = String(req.params['id'])
  const newLike = await createLike(postId, req['userId']!)
  return res.status(201).json(newLike)
})

router.delete('/', requireAuth, async (req, res) => {
  const postId = String(req.params['id'])
  await deleteLike(postId, req['userId']!)
  return res.status(204).send()
})

export default router
