import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import apiRoutes from './routes/api'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running')
})

connectDB() // Connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
})
