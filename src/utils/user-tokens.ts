import type { IUser } from '../modules/user/user.types'
import dotenv from 'dotenv'
import { generateToken } from './jwt'

dotenv.config()

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const JWT_ACCESS_EXPIRED = process.env.JWT_ACCESS_EXPIRED!
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
const JWT_REFRESH_EXPIRED = process.env.JWT_REFRESH_EXPIRED!

export function createUserTokens(user: Partial<IUser>) {
  // Creating access token
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }
  const accessToken = generateToken(jwtPayload, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRED)

  // Creating refresh token
  const refreshToken = generateToken(jwtPayload, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRED)
  return { accessToken, refreshToken }
}
