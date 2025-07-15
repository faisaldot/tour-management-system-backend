import type jwt from 'jsonwebtoken'
import type { IAuthProvider, IUser } from './user.types'
import bcrypt from 'bcryptjs'
import httpStatusCode from 'http-status-codes'
import AppError from '../../errors/app-error'
import { UserModel } from './user.model'
import { Role } from './user.types'

const BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND!

// Creating user service
async function createUser({ email, password, ...rest }: Partial<IUser>) {
  // Checking if any user already exists
  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    throw new AppError(httpStatusCode.BAD_REQUEST, 'User already exists!')
  }

  const authProvider: IAuthProvider = { provider: 'credentials', providerId: email! }

  // Encrypting user password
  const hashedPassword = await bcrypt.hash(password!, 10)

  const user = await UserModel.create({ email, password: hashedPassword, auths: [authProvider], ...rest })
  return user
}

// Update user service
async function updateUser(userId: string, payload: Partial<IUser>, decodeToken: jwt.JwtPayload) {
  // - Checking user are exist in the database
  const user = await UserModel.findById(userId)
  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, 'User not found!')
  }

  // Prevent unauthorize role update
  if (payload.role) {
    if (
      decodeToken.role === Role.USER
      || decodeToken.role === Role.GUIDE
      || payload.role === Role.SUPER_ADMIN
    ) {
      throw new AppError(httpStatusCode.FORBIDDEN, 'You are not authorized to update user role')
    }
  }

  // Prevent unauthorize status update
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodeToken.role === Role.USER || decodeToken.role === Role.GUIDE) {
      throw new AppError(httpStatusCode.FORBIDDEN, 'You are not authorized to update user status')
    }
  }

  // Hash password before saving
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, Number(BCRYPT_SALT_ROUND))
  }

  // Prevent email update
  if (decodeToken.email && decodeToken.email !== user.email) {
    throw new AppError(httpStatusCode.FORBIDDEN, 'Email can\'t be updated')
  }

  // Update user
  const newUpdateUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

  return newUpdateUser
}

// Get all users service
async function getUsers() {
  const users = await UserModel.find()
  return users
}

export const UserService = { createUser, getUsers, updateUser }
