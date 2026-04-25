import express from 'express'
import usersService from '../services/users.ts'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const userId = String(req.params['id'])
  const user = await usersService.getUserById(userId)
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo')
    }, 3000)
  })
  return res.status(200).json(user)
})

export default router
