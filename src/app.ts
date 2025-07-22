import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import expressSession from 'express-session'
import passport from 'passport'
import globalErrorHandler from './middlewares/global-error-handler'
import notFound from './middlewares/not-found'
import router from './routes'
import './config/passport'

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET!

const app = express()

// App level middleware
app.use(expressSession({
  secret: EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
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
