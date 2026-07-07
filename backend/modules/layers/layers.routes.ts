import express from 'express'
import { HazardQueryParamsSchema } from './layers.schemas.js'
import { LAYERS_REGISTRY } from './layers.registry.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const payload = HazardQueryParamsSchema.parse(req.query)

  const results = await Promise.all(
    payload.layers.map(async (layer) => {
      const fetcher = LAYERS_REGISTRY[layer]
      const data = await fetcher(payload)
      return [layer, data] as const
    }),
  )

  return res.status(200).json(Object.fromEntries(results))
})

export default router
