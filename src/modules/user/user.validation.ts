import z from 'zod'
import { IsActive, Role } from './user.types'

export const createUserZodSchema = z.object({
  name: z.string()
    .min(2, { error: 'Name must be at least 2 character long' })
    .max(55, { error: 'Name can\'nt extends 50 characters.' }),
  email: z.email()
    .min(5, { error: 'Email must be at least 5 character long' })
    .max(100, { error: 'Email can\'t extends 100 characers.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/^(?=.*[A-Z])/, {
      message: 'Password must contain at least 1 uppercase letter.',
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: 'Password must contain at least 1 special character.',
    })
    .regex(/^(?=.*\d)/, {
      message: 'Password must contain at least 1 number.',
    }),
  phone: z.string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, { error: 'Phone number must be valid for Bangladesh' })
    .optional(),
  address: z.string()
    .max(255)
    .optional(),
})

export const updateUserZodSchema = z.object({
  name: z.string()
    .min(2, { error: 'Name minimum at least 2 character' })
    .max(55, { error: 'Name can\'t be extends 55 charaters long' })
    .optional(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/^(?=.*[A-Z])/, {
      message: 'Password must contain at least 1 uppercase letter.',
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: 'Password must contain at least 1 special character.',
    })
    .regex(/^(?=.*\d)/, {
      message: 'Password must contain at least 1 number.',
    })
    .optional(),
  phone: z.string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, { error: 'Phone number must be valid for Bangladesh' })
    .optional(),
  address: z.string()
    .max(255)
    .optional(),
  role: z.enum(Object.values(Role)).optional(),
  isActive: z.enum(Object.values(IsActive)).optional(),
  isDeleted: z.boolean().optional(),
  isVerified: z.boolean().optional(),
})
