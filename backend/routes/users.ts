import express from 'express'
import usersService from '../services/users.ts'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const userId = String(req.params['id'])
  const user = await usersService.getUserById(userId)
  return res.status(200).json(user)
})

export default router
