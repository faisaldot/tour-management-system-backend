import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 9001
const MONGO_URI = process.env.MONGO_URI as string

// Database connection
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Database connected successfully ✔`)
  }
  catch (error) {
    console.error(`❌Failed to connect with database ): ${error}`)
  }
}

// Server creating
async function startServer() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  }
  catch (error) {
    console.error(`Server failed to running... ): ${error}`)
  }
}

// Calling Server
startServer()
