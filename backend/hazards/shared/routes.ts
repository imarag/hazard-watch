import express from 'express'
import { z } from 'zod'
import {
  getEarthquakes,
  getEruptions,
  getWildfires,
  getTsunamis,
} from './services.ts'
import { EarthquakeQueryParamsSchema } from '../earthquakes/schema.ts'
import { EruptionQueryParamsSchema } from '../eruptions/schema.ts'
import { WildfireQueryParamsSchema } from '../wildfires/schema.ts'
import { TsunamiQueryParamsSchema } from '../tsunamis/schema.ts'
import { providers } from '../shared/static.ts'

const router = express.Router()

router.get('/earthquakes', async (req, res) => {
  const parsed = EarthquakeQueryParamsSchema.safeParse(req.query)
  if (!parsed.success)
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  const data = await getEarthquakes(parsed.data)
  return res.status(200).json({
    data,
    info: {
      ...providers.usgs.earthquakes.info,
      totalFeatures: data.features.length,
    },
  })
})

router.get('/eruptions', async (req, res) => {
  const parsed = EruptionQueryParamsSchema.safeParse(req.query)
  if (!parsed.success)
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  const data = await getEruptions(parsed.data)
  return res.status(200).json({
    data,
    info: {
      ...providers.gvp.eruptions.info,
      totalFeatures: data.features.length,
    },
  })
})

router.get('/wildfires', async (req, res) => {
  const parsed = WildfireQueryParamsSchema.safeParse(req.query)
  if (!parsed.success)
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  const data = await getWildfires(parsed.data)
  return res.status(200).json({
    data,
    info: {
      ...providers.firms.wildfires.info,
      totalFeatures: data.features.length,
    },
  })
})

router.get('/tsunamis', async (req, res) => {
  const parsed = TsunamiQueryParamsSchema.safeParse(req.query)
  if (!parsed.success)
    return res.status(400).json({ errors: z.treeifyError(parsed.error) })
  const data = await getTsunamis(parsed.data)
  return res.status(200).json({
    data,
    info: {
      ...providers.noaa.tsunamis.info,
      totalFeatures: data.features.length,
    },
  })
})

export default router
