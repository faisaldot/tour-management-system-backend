import type mongoose from 'mongoose'

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUIDE = 'GUIDE',
}

export enum IsActive {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export interface IAuthProvider {
  provider: 'google' | 'credentials'
  providerId: string
}

export interface IUser {
  name: string
  email: string
  password?: string
  role: Role
  phone?: string
  picture?: string
  address?: string
  isDeleted?: boolean
  isVerified?: boolean
  isActive?: IsActive
  auths: IAuthProvider[]
  booking?: mongoose.Types.ObjectId[]
  guide?: mongoose.Types.ObjectId[]
}
