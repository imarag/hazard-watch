import express from 'express'
import postService from '../services/posts.ts'
import { CreatePostSchema, UpdatePostSchema } from '../models/posts.ts'
import type { PostPayload } from '../types/posts.ts'
import { requireAuth, requireOwnership } from '../middleware.ts'

const router = express.Router()

router.get('/', async (_req, res) => {
  const posts = await postService.getAllPosts()
  return res.status(200).json(posts)
})

router.get('/:id', async (req, res) => {
  const postId = String(req.params['id'])
  const post = await postService.getPostById(postId)
  return res.status(200).json(post)
})

router.post('/', requireAuth, async (req, res) => {
  const body = req.body
  const parsedPost = CreatePostSchema.parse(body)
  const newPost: PostPayload = {
    ...parsedPost,
    createdAt: new Date().toISOString(),
    userId: req.userId!,
    userName: req.userName!,
  }
  const post = await postService.createPost(newPost)
  return res.status(201).json(post)
})

router.put('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  const body = req.body
  const updatedPost = UpdatePostSchema.parse(body)
  const post = await postService.updatePost(updatedPost, postId)
  return res.status(200).json(post)
})

router.delete('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  await postService.deletePost(postId)
  return res.status(204).send()
})

export default router
