import type { IUser } from '../user/user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { generateToken } from '../../utils/jwt'
import { UserModel } from '../user/user.model'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

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

  // Creating access token
  const accessToken = generateToken({
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  }, JWT_SECRET, JWT_EXPIRES_IN)

  return {
    accessToken,
  }
}

export const AuthService = { credentialsLogin }
