import type { Server } from 'node:http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 9001
const MONGO_URI = process.env.MONGO_URI as string
let server: Server

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
    server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  }
  catch (error) {
    console.error(`Server failed to running... ): ${error}`)
  }
}

// Calling Server
startServer()

// Shutting down server gracefully if any uncaught and unexpected error occurred.
function shutdown(message: string, err?: unknown) {
  console.error(message, err || '')
  if (server) {
    server.close(() => process.exit(1))
  }
  else {
    process.exit(1)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM signal received. Server shutting down...'))
process.on('SIGINT', () => shutdown('SIGINT signal received. Server shutting down...'))
process.on('unhandledRejection', err => shutdown('Uncaught rejection detected. Server shutting down...', err))
process.on('uncaughtException', err => shutdown('Uncaught exception detected. Server shutting down..', err))
