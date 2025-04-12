import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import router from './app/routes'
import globalErrorHandeler from './app/errors/globalErrorHandeler'
import notFound from './app/middlewares/notFounds'

const app: Application = express()

// middleware
app.use(express.json())
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Local development
      'https://your-production-frontend.vercel.app', // Production frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)

app.use('/api', router)

// health check
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandeler)

app.use(notFound)

export default app

export const localServer = app
