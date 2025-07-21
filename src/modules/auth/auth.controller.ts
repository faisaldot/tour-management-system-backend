import type { Request, Response } from 'express'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import setAuthCookie from '../../utils/set-cookie'
import { AuthService } from './auth.services'

// Credential login controller
const credentialsLogin = catchAsync (
  async (req: Request, res: Response) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo)

    sendResponse(res, 200, 'Logged in successfully.', loginInfo)
  },
)

// Get new access token controller
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    const tokenInfo = await AuthService.getNewAccessToken(refreshToken)

    setAuthCookie(res, tokenInfo)

    sendResponse(res, 200, 'New access token retrive successfull!', tokenInfo)
  },
)

// Logout controller
const logout = catchAsync(
  async (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    })

    sendResponse(res, 200, 'Logged out successful!', null)
  },
)

// Reset-password controller
const resetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const decodeToken = req.user
    const { oldPassword, newPassword } = req.body

    await AuthService.resetPassword(oldPassword, newPassword, decodeToken)

    sendResponse(res, 200, 'Password reset successfully!', null)
  },
)

export const AuthController = { credentialsLogin, getNewAccessToken, logout, resetPassword }
