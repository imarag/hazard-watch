import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.ts'
import PostsRouter from './routes/posts.ts'
import UsersRouter from './routes/users.ts'
import morgan from 'morgan'
import cors from 'cors'
import config from './config.ts'
import { extractToken, errorHandler, routeNotFound } from './middleware.ts'
import { connectDb } from './server.ts'

const app = express()

connectDb()
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.error('Cannot connect to Mongo DB'))

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

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)
app.use('/api/users', UsersRouter)

app.use(routeNotFound)

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server initialized in port: ${config.PORT}`)
})
