import express from 'express'
import { z } from 'zod'
import { GlobalHazardParamsSchema } from './schema.ts'
import { layerFetchMapping } from './utils.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  const parsed = GlobalHazardParamsSchema.safeParse(req.query)

  if (!parsed.success)
    return res.status(400).json({ errors: z.prettifyError(parsed.error) })

  const results = await Promise.all(
    parsed.data.layers.map(async (layer) => {
      const fetchFn = layerFetchMapping[layer]
      const data = await fetchFn(parsed.data)
      return [layer, data] as const
    }),
  )

  const response = Object.fromEntries(results)
  return res.status(200).json(response)
})

export default router
