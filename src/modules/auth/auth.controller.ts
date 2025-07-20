import type { Request, Response } from 'express'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import setAuthCookie from '../../utils/set-cookie'
import { AuthService } from './auth.services'

const credentialsLogin = catchAsync (
  async (req: Request, res: Response) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo)

    sendResponse(res, 200, 'Logged in successfully.', loginInfo)
  },
)

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    const tokenInfo = await AuthService.getNewAccessToken(refreshToken)

    setAuthCookie(res, tokenInfo)

    sendResponse(res, 200, 'New access token retrive successfull!', tokenInfo)
  },
)

export const AuthController = { credentialsLogin, getNewAccessToken }
