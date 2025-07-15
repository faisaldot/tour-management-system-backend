import { Router } from 'express'
import checkAuth from '../../middlewares/check-auth'
import validateRequest from '../../middlewares/validate-request'
import { UserController } from './user.controller'
import { Role } from './user.types'
import { createUserZodSchema, updateUserZodSchema } from './user.validation'

const userRoutes = Router()

userRoutes.post('/register', validateRequest(createUserZodSchema), UserController.createUser)
userRoutes.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserController.getUsers)
userRoutes.patch('/:id', checkAuth(...Object.values(Role)), validateRequest(updateUserZodSchema), UserController.updateUser)

export default userRoutes
