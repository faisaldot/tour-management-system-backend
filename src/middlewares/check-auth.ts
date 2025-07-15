import type { NextFunction, Request, Response } from 'express'
import AppError from '../errors/app-error'
import { verifyToken } from '../utils/jwt'

export default function checkAuth(...authRole: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization

      if (!accessToken) {
        throw new AppError(403, 'Invalid access token...')
      }

      const verifiedToken = verifyToken(accessToken, 'secret')

      if (!authRole.includes(verifiedToken.role)) {
        throw new AppError(403, 'You don\'t have access to this route')
      }

      next()
    }
    catch (error) {
      next(error)
    }
  }
}
