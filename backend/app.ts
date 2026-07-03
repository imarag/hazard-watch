import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import authRouter from './modules/auth/index.js'
import postsRouter from './modules/posts/index.js'
import layersRouter from './modules/layers/index.js'
import config from './lib/config.js'
import {
  extractToken,
  errorHandler,
  routeNotFound,
  camelCaseQueryTransformer,
} from './middleware.js'
import helmet from 'helmet'

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

app.use(helmet())
app.use(camelCaseQueryTransformer)
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use(extractToken)

app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/hazards', layersRouter)

// Static frontend (production only — in dev, Vite serves it)
if (config.NODE_ENV === 'production') {
  const publicDir = path.join(config.ROOT_DIR, 'public')
  app.use(express.static(publicDir))

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
  })
}

app.use(routeNotFound)
app.use(errorHandler)

export default app
