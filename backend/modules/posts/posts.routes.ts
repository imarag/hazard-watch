import express from 'express'
import { searchPosts, getPostById, createPost, updatePost, deletePost } from './posts.service.js'
import {
  CreatePostPayloadSchema,
  UpdatePostPayloadSchema,
  type CreatePostData,
  SearchParamsSchema
} from '../posts/posts.schemas.js'
import { requireAuth, requireOwnership } from '../../middleware.js'

const router = express.Router()

router.get('/search', async (req, res) => {
  const queryParams = SearchParamsSchema.parse(req.query)
  const data = await searchPosts(queryParams)
  return res.json(data)
})

router.get('/:id', async (req, res) => {
  const postId = String(req.params['id'])
  const post = await getPostById(postId)
  return res.status(200).json(post)
})

router.post('/', requireAuth, async (req, res) => {
  const body = req.body
  const parsedPost = CreatePostPayloadSchema.parse(body)
  const newPost: CreatePostData = {
    ...parsedPost,
    author_id: req.userId!,
  }
  const post = await createPost(newPost)
  return res.status(201).json(post)
})

router.put('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  const body = req.body
  const parsedPost = UpdatePostPayloadSchema.parse(body)
  const updatedPost = await updatePost(parsedPost, postId)
  return res.status(200).json(updatedPost)
})

router.delete('/:id', requireAuth, requireOwnership, async (req, res) => {
  const postId = String(req.params['id'])
  await deletePost(postId)
  return res.status(204).send()
})

export default router
