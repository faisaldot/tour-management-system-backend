import type { Request, Response } from 'express'
import { UserService } from './user.services'

async function createUser(req: Request, res: Response) {
  try {
    const user = await UserService.createUser(req.body)
    res.status(201).json({
      success: true,
      message: `User created successfully`,
      user,
    })
  }
  catch (error: any) {
    console.error(error.message)
    res.status(400).json({
      success: false,
      message: `Failed to create user`,
      error: error.message,
    })
  }
}

export const UserController = { createUser }
