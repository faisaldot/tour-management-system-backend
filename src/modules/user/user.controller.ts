import type { NextFunction, Request, Response } from 'express'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import { UserService } from './user.services'

// Create user controller
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserService.createUser(req.body)

  if (!user) {
    next(new AppError(httpStatusCode.NOT_FOUND, 'Failed to create user'))
  }

  sendResponse(res, httpStatusCode.CREATED, 'User created successfully', user)
})

// Update user controller
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id
  const verifiedToken = req.user
  const user = await UserService.updateUser(userId, req.body, verifiedToken)
  if (!user) {
    next(new AppError(httpStatusCode.NOT_FOUND, 'Failed to update user'))
  }
  sendResponse(res, httpStatusCode.OK, 'User updated successfully', user)
})

// Get all users controllers
const getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserService.getUsers()

  if (!users || users.length === 0) {
    return next(new AppError(httpStatusCode.NOT_FOUND, 'No user found'))
  }

  sendResponse(res, httpStatusCode.OK, 'User retrive successfully!', users)
})

export const UserController = { createUser, getUsers, updateUser }
