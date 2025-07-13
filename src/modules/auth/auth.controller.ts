import type { Request, Response } from 'express'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import { AuthService } from './auth.services'

const credentialsLogin = catchAsync (
  async (req: Request, res: Response) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)

    sendResponse(res, 200, 'Logged in successfully.', loginInfo)
  },
)

export const AuthController = { credentialsLogin }
