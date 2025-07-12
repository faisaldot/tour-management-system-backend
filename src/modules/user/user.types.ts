import type mongoose from 'mongoose'

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum IsActive {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IAuthProvider {
  provider: 'google' | 'credentials'
  providerId: string
}

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password?: string
  role?: Role
  phone?: string
  picture?: string
  address?: string
  isDeleted?: boolean
  isVerified?: boolean
  isActive?: IsActive
  auths: IAuthProvider[]
  booking: mongoose.Types.ObjectId[]
  guide: mongoose.Types.ObjectId[]
}
