import z from 'zod'

export const emailField = z
  .email('Please enter a valid email address')
  .trim()
  .toLowerCase()

export const passwordField = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(72, 'Password is too long, please use fewer than 72 characters')

export const nameField = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters long')
  .max(80, 'Name is too long, please use fewer than 80 characters')
  .regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces and hyphens')

export const UserUpdateInformationSchema = z.object({
  name: nameField.optional(),
})

export const CreateUserSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
})
export type CreateUser = z.infer<typeof CreateUserSchema>

export type UserUpdateInformation = z.infer<typeof UserUpdateInformationSchema>
