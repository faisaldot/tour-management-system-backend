import type { IUser } from '../user/user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { generateToken, verifyToken } from '../../utils/jwt'
import { createUserTokens } from '../../utils/user-tokens'
import { UserModel } from '../user/user.model'
import { IsActive } from '../user/user.types'

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED!

async function credentialsLogin({ email, password }: Partial<IUser>) {
  // Checking user are exists or not
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'This user does\'n exists, please sign up first then login.')
  }

  // Checking given password are matched or not
  if (!password || !user.password) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'Missing credentials')
  }

  const validatePassword = await bcrypt.compare(password, user.password)

  if (!validatePassword) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'Incorrect password.')
  }

  const { accessToken, refreshToken } = createUserTokens(user)

  // eslint-disable-next-line ts/no-unused-vars
  const { password: pass, ...rest } = user.toObject()

  return {
    accessToken,
    refreshToken,
    ...rest,
  }
}

async function getNewAccessToken(refreshToken: string) {
  const verifiedRefreshToken = verifyToken(refreshToken, JWT_REFRESH_SECRET)

  const user = await UserModel.findOne({ email: verifiedRefreshToken.email })

  if (!user) {
    throw new AppError(404, 'User does\'t exists!')
  }

  if (user.isActive === IsActive.INACTIVE || user.isActive === IsActive.BLOCKED) {
    throw new AppError(400, `User are ${user.isActive}`)
  }

  if (user.isDeleted) {
    throw new AppError(400, 'User are deleted!')
  }

  const accessToken = generateToken(
    { userId: user._id, email: user.email, role: user.role },
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRED,
  )

  return { accessToken }
}

export const AuthService = { credentialsLogin, getNewAccessToken }
