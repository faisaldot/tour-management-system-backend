import type { Response } from 'express'

interface ResponseData<T> {
  success: boolean
  message: string
  data: T
}

export default function sendResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
): any {
  const responseData: ResponseData<T> = {
    success: true,
    message,
    data,
  }
  res.status(statusCode).json(responseData)
}
