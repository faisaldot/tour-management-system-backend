import { Router } from 'express'
import { UserController } from './user.controller'

const userRoutes = Router()

userRoutes.post('/register', UserController.createUser)
userRoutes.get('/', UserController.getUsers)

export default userRoutes
