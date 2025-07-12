import z from 'zod'

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
