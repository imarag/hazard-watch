import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.ts'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/auth', AuthRouter)

app.get('/', (_req, res) => {
  return res.send('hello')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server initialized in port: ${PORT}`)
})
