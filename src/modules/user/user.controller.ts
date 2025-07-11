import type { NextFunction, Request, Response } from 'express'
import AppError from '../../errors/app-error'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import { UserService } from './user.services'

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserService.createUser(req.body)
  if (!user) {
    next(new AppError(400, 'Failed to create user'))
  }
  console.log(user)
  await sendResponse(res, 201, 'User created successfully', user)
})

const getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserService.getUsers()
  console.log(users)
  if (!users || users.length === 0) {
    return next(new AppError(404, 'No user found'))
  }
  sendResponse(res, 200, 'User retrive successfully!', users)
})

export const UserController = { createUser, getUsers }
