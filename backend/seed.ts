// seed.ts
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { PostModel } from './models/posts.js'
import { UserModel } from './models/users.js'
import config from './config.js'

const uri = `mongodb+srv://${config.MONGO_DB_USERNAME}:${config.MONGO_DB_PASSWORD}@clustermongo.wn3vaaa.mongodb.net/HazardWatch?appName=ClusterMongo`

async function seed() {
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  await PostModel.deleteMany({})
  await UserModel.deleteMany({})
  console.log('Cleared existing data')

  const users = await UserModel.insertMany([
    {
      name: 'giannis maragkakis',
      email: 'giannis.marar@hotmail.com',
      password: await bcrypt.hash('12345678', 10),
    },
    {
      name: 'georgia maragkaki',
      email: 'georgia.maragkaki@hotmail.com',
      password: await bcrypt.hash('12345678', 10),
    },
    {
      name: 'antonia marar',
      email: 'antonia.maragkaki@gmail.com',
      password: await bcrypt.hash('12345678', 10),
    },
  ])

  const [giannis, georgia, antonia] = users

  if (!giannis || !georgia || !antonia) {
    throw new Error('Users do not exist')
  }

  await PostModel.insertMany([
    {
      title: 'flood in thessaloniki port',
      description: 'heavy rain flooding port and coastal road',
      hazardType: 'flood',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [22.9444, 40.6401] },
        properties: {},
      },
      user: giannis._id,
    },
    {
      title: 'wildfire near athens',
      description: 'fire spreading through pine forest outside city',
      hazardType: 'wildfire',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [23.8, 38.1] },
        properties: {},
      },
      user: georgia._id,
    },
    {
      title: 'earthquake in thessaloniki',
      description: 'magnitude 4.8 quake felt across northern greece',
      hazardType: 'earthquake',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [22.9444, 40.6401] },
        properties: {},
      },
      user: antonia._id,
    },
    {
      title: 'storm approaching city',
      description: 'strong winds expected in 6 hours',
      hazardType: 'storm',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-0.13, 51.49] },
        properties: {},
      },
      user: giannis._id,
    },
    {
      title: 'river overflow warning',
      description: 'flood risk increasing near river bank',
      hazardType: 'flood',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-0.11, 51.5] },
        properties: {},
      },
      user: georgia._id,
    },
    {
      title: 'earthquake in crete',
      description: 'magnitude 5.1 quake off southern coast',
      hazardType: 'earthquake',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [25.1442, 35.2401] },
        properties: {},
      },
      user: antonia._id,
    },
    {
      title: 'wildfire in cyprus',
      description: 'fire spreading near troodos mountains',
      hazardType: 'wildfire',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [33.3823, 35.1264] },
        properties: {},
      },
      user: giannis._id,
    },
    {
      title: 'tsunami alert coastal area',
      description: 'wave height exceeding 3 meters reported',
      hazardType: 'flood',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [139.6917, 35.6895] },
        properties: {},
      },
      user: georgia._id,
    },
    {
      title: 'tornado warning oklahoma',
      description: 'multiple tornadoes spotted on ground',
      hazardType: 'storm',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-97.5164, 35.4676] },
        properties: {},
      },
      user: antonia._id,
    },
    {
      title: 'amazon wildfire spreading',
      description: 'large wildfire consuming forest area',
      hazardType: 'wildfire',
      location: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-60.0261, -3.1019] },
        properties: {},
      },
      user: giannis._id,
    },
  ])

  console.log('Seeded 3 users and 10 posts ✅')
  await mongoose.disconnect()
}

seed().catch(console.error)
