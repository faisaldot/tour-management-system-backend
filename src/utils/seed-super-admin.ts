import { UserModel } from "../modules/user/user.model"
import bcrypt from 'bcryptjs'
import { IAuthProvider, IUser, Role } from "../modules/user/user.types"

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL!
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD!
const BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND!

export default async function seedSuperAdmin() {
  try {
    // Checking super admin is already exist
    const isSuperAdminExist = await UserModel.findOne({email: SUPER_ADMIN_EMAIL})
    if(isSuperAdminExist){
      console.log('Super admin already exists')
      return 
    }

    console.log('creating super admin...')

    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, Number(BCRYPT_SALT_ROUND))

    const authProvider:IAuthProvider = {provider: 'credentials', providerId: SUPER_ADMIN_EMAIL} 

    const payload: IUser = {
      name: 'Super Admin',
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      isVerified: true,
      auths: [authProvider]
    }

    await UserModel.create(payload)
    console.log(`Super admin created successfully!`)

  } catch (error) {
    console.error(error)
  }
}
