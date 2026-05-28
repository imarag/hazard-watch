import express from 'express'
import { z } from 'zod'
import { getEarthquakes, getEruptions, getWildfires } from '../services/hazards.ts'
import {
  earthquakeQueryParamsSchema,
  eruptionQueryParamsSchema,
  wildfireQueryParamsSchema
} from '../models/hazards.ts'

const router = express.Router()

router.get('/earthquakes', async (req, res) => {
  const parsed = earthquakeQueryParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getEarthquakes(parsed.data)
  return res.status(200).json(data)
})

router.get('/eruptions', async (req, res) => {
  const parsed = eruptionQueryParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getEruptions(parsed.data)
  return res.status(200).json(data)
})

router.get('/wildfires', async (req, res) => {
  const parsed = wildfireQueryParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getWildfires(parsed.data)
  return res.status(200).json(data)
})

export default router
