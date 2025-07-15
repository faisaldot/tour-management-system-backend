import { Router } from 'express'
import checkAuth from '../../middlewares/check-auth'
import validateRequest from '../../middlewares/validate-request'
import { UserController } from './user.controller'
import { Role } from './user.types'
import { createUserZodSchema } from './user.validation'

const userRoutes = Router()

userRoutes.post('/register', validateRequest(createUserZodSchema), UserController.createUser)
userRoutes.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getUsers)

export default userRoutes
