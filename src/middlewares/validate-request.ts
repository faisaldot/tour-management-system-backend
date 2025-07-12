import type { NextFunction, Request, Response } from 'express'
import type { ZodObject } from 'zod'

export default function validateRequest(zodschema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodschema.parseAsync(req.body)
    }
    catch (error) {
      next(error)
    }
  }
}
