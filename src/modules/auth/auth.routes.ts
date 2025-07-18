import { Router } from 'express'
import { AuthController } from './auth.controller'

const authRoutes = Router()

authRoutes.post('/login', AuthController.credentialsLogin)

export default authRoutes
