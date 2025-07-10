import express from 'express'
import cors from 'cors'

const app = express()

// App level middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    message: "Ok"
  })
})


export default app;
