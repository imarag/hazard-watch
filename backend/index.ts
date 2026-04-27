import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import AuthRouter from './routes/auth.js'
import PostsRouter from './routes/posts.js'
import UsersRouter from './routes/users.js'
import config from './config.js'
import { extractToken, errorHandler, routeNotFound } from './middleware.js'
import { connectDb } from './server.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

connectDb()
  .then(() => console.log('Connected to Mongo DB'))
  .catch(() => console.error('Cannot connect to Mongo DB'))

if (config.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
}

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use(extractToken)

// API routes
app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)
app.use('/api/users', UsersRouter)

// Static frontend (production only — in dev, Vite serves it)
if (config.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')))

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}

app.use(routeNotFound)
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server initialized in port: ${config.PORT}`)
})
