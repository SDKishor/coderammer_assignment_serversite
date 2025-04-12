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
    origin: 'https://coderammer-clientside.vercel.app',
    credentials: true, // if you're using cookies/auth headers
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
