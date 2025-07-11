import type { NextFunction, Request, Response } from 'express'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export default function catchAsync(fn: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
  }
}
