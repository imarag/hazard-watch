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

// router.get('/earthquakes', async (req, res) => {
//   const parsed = earthquakeParamsSchema.safeParse(req.query)
//   if (!parsed.success) {
//     return res.status(400).json({ errors: z.treeifyError(parsed.error) })
//   }
//   const data = await getEarthquakes(parsed.data)
//   return res.status(200).json(data)
// })

// router.get('/volcanoes', async (req, res) => {
//   const parsed = volcanoParamsSchema.safeParse(req.query)
//   if (!parsed.success) {
//     return res.status(400).json({ errors: z.treeifyError(parsed.error) })
//   }
//   const data = await getVolcanoes(parsed.data)
//   return res.status(200).json(data)
// })

// router.get('/eruptions', async (req, res) => {
//   const parsed = eruptionParamsSchema.safeParse(req.query)
//   if (!parsed.success) {
//     return res.status(400).json({ errors: z.treeifyError(parsed.error) })
//   }
//   const data = await getEruptions(parsed.data)
//   return res.status(200).json(data)
// })

// export default router

// import { z } from 'zod'
// import {
//   getEarthquakes,
//   getEruptions,
//   getVolcanoes,
// } from '../services/hazards.ts'
// import {
//   earthquakeParamsSchema,
//   volcanoParamsSchema,
//   eruptionParamsSchema,
// } from '../models/hazards.ts'

const dummyEarthquakes = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [139.6917, 35.6895] },
      properties: {
        id: 'eq1',
        magnitude: 6.2,
        depth: 10,
        location: 'Tokyo, Japan',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-118.2437, 34.0522] },
      properties: {
        id: 'eq2',
        magnitude: 5.1,
        depth: 8,
        location: 'Los Angeles, USA',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [21.8243, 37.9755] },
      properties: {
        id: 'eq3',
        magnitude: 4.7,
        depth: 15,
        location: 'Athens, Greece',
      },
    },
  ],
}

const dummyFloods = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [90.4125, 23.8103] },
      properties: {
        id: 'fl1',
        severity: 'high',
        affectedArea: 'Dhaka, Bangladesh',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [114.0579, 22.5431] },
      properties: {
        id: 'fl2',
        severity: 'medium',
        affectedArea: 'Guangzhou, China',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [8.6753, 9.082] },
      properties: { id: 'fl3', severity: 'high', affectedArea: 'Nigeria' },
    },
  ],
}

const dummyWildfires = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-119.4179, 36.7783] },
      properties: { id: 'wf1', intensity: 'extreme', area: 'California, USA' },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [149.13, -35.2809] },
      properties: { id: 'wf2', intensity: 'high', area: 'Canberra, Australia' },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [28.9784, 41.0082] },
      properties: { id: 'wf3', intensity: 'medium', area: 'Istanbul, Turkey' },
    },
  ],
}

const dummyStorms = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [121.774, 12.8797] },
      properties: {
        id: 'st1',
        category: 4,
        windSpeed: 220,
        name: 'Typhoon Karding',
        location: 'Philippines',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-80.1918, 25.7617] },
      properties: {
        id: 'st2',
        category: 3,
        windSpeed: 185,
        name: 'Hurricane Ian',
        location: 'Florida, USA',
      },
    },
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [85.324, 23.3441] },
      properties: {
        id: 'st3',
        category: 2,
        windSpeed: 140,
        name: 'Cyclone Yaas',
        location: 'Bay of Bengal',
      },
    },
  ],
}

router.get('/earthquake', async (_req, res) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))

  return res.status(200).json(dummyEarthquakes)
})

router.get('/flood', async (_req, res) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
  return res.status(200).json(dummyFloods)
})

router.get('/wildfire', async (_req, res) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
  return res.status(200).json(dummyWildfires)
})

router.get('/storm', async (_req, res) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
  return res.status(200).json(dummyStorms)
})

export default router
