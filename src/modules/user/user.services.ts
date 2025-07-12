import type { IAuthProvider, IUser } from './user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { UserModel } from './user.model'

async function createUser({ email, password, ...rest }: Partial<IUser>) {
  // Checking if any user already exists
  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    throw new AppError(httpStatusCode.NOT_FOUND, 'User already exists!')
  }

  const authProvider: IAuthProvider = { provider: 'credentials', providerId: email! }

  // Encrypting user password
  const hashedPassword = await bcrypt.hash(password!, 10)

  const user = await UserModel.create({ email, password: hashedPassword, auths: [authProvider], ...rest })
  return user
}

async function getUsers() {
  const users = await UserModel.find()
  return users
}

export const UserService = { createUser, getUsers }
