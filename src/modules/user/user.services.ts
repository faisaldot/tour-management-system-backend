import type { IUser } from './user.types'
import { UserModel } from './user.model'

async function createUser(payload: Partial<IUser>) {
  const { name, email } = payload
  const user = await UserModel.create({ name, email })
  return user
}

export const UserService = { createUser }
