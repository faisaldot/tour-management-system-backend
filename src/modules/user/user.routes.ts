import { Router } from 'express'
import validateRequest from '../../middlewares/validate-request'
import { UserController } from './user.controller'
import { createUserZodSchema } from './user.validation'

const userRoutes = Router()

userRoutes.post('/register', validateRequest(createUserZodSchema), UserController.createUser)
userRoutes.get('/', UserController.getUsers)

export default userRoutes
