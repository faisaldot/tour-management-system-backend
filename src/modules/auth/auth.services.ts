import type { IUser } from '../user/user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { createUserTokens } from '../../utils/user-tokens'
import { UserModel } from '../user/user.model'

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

export const AuthService = { credentialsLogin }
