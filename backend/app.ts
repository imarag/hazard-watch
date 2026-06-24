import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import AuthRouter from './auth/routes.ts'
import PostsRouter from './posts/routes.ts'
import HazardsRouter from './hazards/shared/routes.ts'
import config from './lib/config.ts'
import { extractToken, errorHandler, routeNotFound, camelCaseQueryTransformer } from './middleware.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// allow cors in development only, since in production the frontend is served statically from the same origin
if (config.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
}

app.use(camelCaseQueryTransformer)
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use(extractToken)

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)
app.use('/api/hazards', HazardsRouter)

// Static frontend (production only — in dev, Vite serves it)
if (config.NODE_ENV === 'production') {
  const publicDir = path.join(__dirname, 'public')
  app.use(express.static(publicDir))

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
  })
}

app.use(routeNotFound)
app.use(errorHandler)

export default app
