import { Router } from 'express'
import { UserController } from './user.controller'

const userRoutes = Router()

userRoutes.post('/register', UserController.createUser)

export default userRoutes
