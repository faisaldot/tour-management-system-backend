import type { IUser } from '../user/user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { UserModel } from '../user/user.model'

async function credentialsLogin({ email, password }: Partial<IUser>) {
  // Checking user are exists or not

  const isUserExist = await UserModel.findOne({ email })

  if (!isUserExist) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'This email are does\'n exists, please sign up first then login.')
  }

  // Checking given password are matched or not
  if (!password || !isUserExist.password) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'Missing credentials')
  }

  const validatePassword = await bcrypt.compare(password, isUserExist.password)

  if (!validatePassword) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'Incorrect password.')
  }

  return {
    email,
  }
}

export const AuthService = { credentialsLogin }
