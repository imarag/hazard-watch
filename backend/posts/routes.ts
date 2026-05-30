import express from 'express'
import postService from '../posts/services.ts'
import {
  CreatePostPayloadSchema,
  UpdatePostPayloadSchema,
} from '../posts/schema.ts'
import type { CreatePostData } from '../posts/schema.ts'
import { requireAuth, requireOwnership } from '../middleware.js'
import { SearchParamsSchema } from '../posts/schema.ts'
import { postQueryParamsSchema } from '../posts/schema.ts'
import postsService from './services.ts'
import z from 'zod'

const router = express.Router()

router.get('/', async (req, res) => {
  const parsedParams = postQueryParamsSchema.safeParse(req.query)
  if (!parsedParams.success) {
    return res.status(400).json({ errors: z.treeifyError(parsedParams.error) })
  }
  const posts = await postsService.getAllPosts(parsedParams.data)
  return res.status(200).json(posts)
})

router.get('/search', async (req, res) => {
  const queryParams = SearchParamsSchema.parse(req.query)
  const data = await postService.searchPosts(queryParams)
  return res.json(data)
})

router.get('/:id', async (req, res) => {
  const postId = String(req.params['id'])
  const post = await postService.getPostById(postId)
  return res.status(200).json(post)
})

router.post('/', requireAuth, async (req, res) => {
  const body = req.body
  const parsedPost = CreatePostPayloadSchema.parse(body)
  const newPost: CreatePostData = {
    ...parsedPost,
    authorId: req.userId!,
  }
  const post = await postService.createPost(newPost)
  return res.status(201).json(post)
})

router.put('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  const body = req.body
  const parsedPost = UpdatePostPayloadSchema.parse(body)
  const updatedPost = await postService.updatePost(parsedPost, postId)
  return res.status(200).json(updatedPost)
})

router.delete('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  await postService.deletePost(postId)
  return res.status(204).send()
})

export default router
