import express from 'express'
import { GlobalHazardQueryParamsSchema } from './layers.schemas.js'
import { LAYERS_REGISTRY } from './layers.registry.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  const payload = GlobalHazardQueryParamsSchema.parse(req.query)

  const results = await Promise.all(
    payload.layers.map(async (layer) => {
      const data = await LAYERS_REGISTRY[layer].fetchFn(payload)
      return [layer, data] as const
    }),
  )

  return res.status(200).json(Object.fromEntries(results))
})

export default router
