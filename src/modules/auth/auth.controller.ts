import type { Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import AppError from '../../errors/app-error'
import catchAsync from '../../utils/catch-async'
import sendResponse from '../../utils/send-response'
import setAuthCookie from '../../utils/set-cookie'
import { createUserTokens } from '../../utils/user-tokens'
import { AuthService } from './auth.services'

const FRONTEND_URL = process.env.FRONTEND_URL!

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

    await AuthService.resetPassword(oldPassword, newPassword, decodeToken as JwtPayload)

    sendResponse(res, 200, 'Password reset successfully!', null)
  },
)

// Google callback controller
const googleCallbackController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user

    let redirectTo = req.query.state ? req.query.state as string : ''

    if (redirectTo.startsWith('/')) {
      redirectTo = redirectTo.slice(1)
    }

    console.log('user', user)

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(`${FRONTEND_URL}/${redirectTo}`)
  },
)

export const AuthController = { credentialsLogin, getNewAccessToken, logout, resetPassword, googleCallbackController }
