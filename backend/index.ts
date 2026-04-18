import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.ts'
import PostsRouter from './routes/posts.ts'
import morgan from 'morgan'
import cors from 'cors'
import { extractToken } from './middleware.ts'

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(extractToken)

app.use('/api/auth', AuthRouter)
app.use('/api/posts', PostsRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server initialized in port: ${PORT}`)
})
