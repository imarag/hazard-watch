import express from 'express'
import { z } from 'zod'
import {
  getEarthquakes,
  getEruptions,
  getVolcanoes,
} from '../services/hazards.ts'
import {
  earthquakeParamsSchema,
  volcanoParamsSchema,
  eruptionParamsSchema,
} from '../models/hazards.ts'

const router = express.Router()

router.get('/earthquakes', async (req, res) => {
  const parsed = earthquakeParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getEarthquakes(parsed.data)
  return res.status(200).json(data)
})

router.get('/volcanoes', async (req, res) => {
  const parsed = volcanoParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getVolcanoes(parsed.data)
  return res.status(200).json(data)
})

router.get('/eruptions', async (req, res) => {
  const parsed = eruptionParamsSchema.safeParse(req.query)
  if (!parsed.success) {
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  }
  const data = await getEruptions(parsed.data)
  return res.status(200).json(data)
})

export default router
