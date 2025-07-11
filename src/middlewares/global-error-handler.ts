import type { NextFunction, Request, Response } from 'express'
import httpStatusCode from 'http-status-codes'
import { ZodError } from 'zod'
import AppError from '../errors/app-error'

function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // Handle Zod validation error
  if (err instanceof ZodError) {
    const formattedError = err.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message,
    }))
    return res.status(httpStatusCode.NOT_FOUND).json({
      success: false,
      message: 'Zod Validation Error',
      errors: formattedError,
    })
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message)
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: message.join(', '),
    })
  }

  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0]
    const value = Object.values((err as any).keyValue)[0]
    return res.status(httpStatusCode.CONFLICT).json({
      success: false,
      message: `Duplicate field value: ${String(value)}. Please use another values for ${field}`,
    })
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  // Handle other errors
  return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'development' ? err.stack : 'undefined',
  })
}

export default globalErrorHandler
