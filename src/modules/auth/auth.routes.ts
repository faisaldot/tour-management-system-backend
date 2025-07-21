import { Router } from 'express'
import checkAuth from '../../middlewares/check-auth'
import { Role } from '../user/user.types'
import { AuthController } from './auth.controller'

const authRoutes = Router()

authRoutes.post('/login', AuthController.credentialsLogin)
authRoutes.post('/refresh-token', AuthController.getNewAccessToken)
authRoutes.post('/logout', AuthController.logout)
authRoutes.post('/reset-password', checkAuth(...Object.values(Role)), AuthController.resetPassword)

export default authRoutes
