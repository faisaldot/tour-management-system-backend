import type { IUser } from './user.types'
import { UserModel } from './user.model'

async function createUser(payload: Partial<IUser>) {
  const { name, email } = payload
  const user = await UserModel.create({ name, email })
  return user
}

async function getUsers() {
  const users = await UserModel.find()
  return users
}

export const UserService = { createUser, getUsers }
