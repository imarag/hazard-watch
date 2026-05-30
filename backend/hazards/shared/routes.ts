import express from 'express'
import { z } from 'zod'
import { getEarthquakes, getEruptions, getWildfires } from './services.ts'
import { EarthquakeQueryParamsSchema } from '../earthquakes/schema.ts'
import { EruptionQueryParamsSchema } from '../eruptions/schema.ts'
import { WildfireQueryParamsSchema } from '../wildfires/schema.ts'
import { GlobalHazardParamsSchema } from './schema.ts'

const router = express.Router()

router.get('/earthquakes', async (req, res) => {
  const parsed = EarthquakeQueryParamsSchema.safeParse(req.query)
  const globalParsed = GlobalHazardParamsSchema.safeParse(req.query)

  if (!parsed.success) return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  if (!globalParsed.success) return res.status(400).json({ errors: z.treeifyError(globalParsed.error) })

  const data = await getEarthquakes(parsed.data, globalParsed.data)
  return res.status(200).json(data)
})

router.get('/eruptions', async (req, res) => {
  const parsed = EruptionQueryParamsSchema.safeParse(req.query)
  const globalParsed = GlobalHazardParamsSchema.safeParse(req.query)

  if (!parsed.success) return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  if (!globalParsed.success) return res.status(400).json({ errors: z.treeifyError(globalParsed.error) })

  const data = await getEruptions(parsed.data, globalParsed.data)
  return res.status(200).json(data)
})

router.get('/wildfires', async (req, res) => {
  const parsed = WildfireQueryParamsSchema.safeParse(req.query)
  const globalParsed = GlobalHazardParamsSchema.safeParse(req.query)

  if (!parsed.success) return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  if (!globalParsed.success) return res.status(400).json({ errors: z.treeifyError(globalParsed.error) })

  const data = await getWildfires(parsed.data, globalParsed.data)
  return res.status(200).json(data)
})

export default router
