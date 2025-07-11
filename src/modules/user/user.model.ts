import type { AuthProvider, IUser } from './user.types'
import mongoose from 'mongoose'
import { IsActive, Role } from './user.types'

const authProviderSchema = new mongoose.Schema<AuthProvider>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
}, {
  versionKey: false,
  _id: false,
})

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: Object.values(Role) },
  phone: { type: String },
  picture: { type: String },
  address: { type: String },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
  isVerified: { type: Boolean, default: false },
  auths: [authProviderSchema],
}, {
  timestamps: true,
  versionKey: false,
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
