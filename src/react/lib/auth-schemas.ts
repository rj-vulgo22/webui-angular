import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

export const signUpSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Senhas não conferem',
    path: ['repeatPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export const updatePasswordSchema = z.object({
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>
