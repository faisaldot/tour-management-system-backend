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

export interface AuthProvider extends mongoose.Document {
  provider: string
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
  auths: AuthProvider[]
  booking: mongoose.Types.ObjectId[]
  guide: mongoose.Types.ObjectId[]
}
