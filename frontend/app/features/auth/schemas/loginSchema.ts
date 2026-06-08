import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
})

export type LoginForm = z.infer<typeof loginSchema>