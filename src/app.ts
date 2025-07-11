import cors from 'cors'
import express from 'express'
import globalErrorHandler from './middlewares/global-error-handler'
import notFound from './middlewares/not-found'
import router from './routes'

const app = express()

// App level middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Api routes
app.use('/api/v1', router)

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Ok',
  })
})

// Error handler middleware
app.use(globalErrorHandler)

// Not found route
app.use(notFound)

export default app
