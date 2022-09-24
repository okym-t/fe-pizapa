import { z } from 'zod'

export const regFormSchema = z
  .object({
    name: z.string(),
    isAnonymous: z.boolean(),
    title: z
      .string()
      .min(1, { message: '必須項目です' })
      .max(100, { message: '100文字以内で入力してください' }),
    description: z
      .string()
      .min(1, { message: '必須項目です' })
      .max(1000, { message: '1000文字以内で入力してください' }),
  })
  .refine(({ name, isAnonymous }) => isAnonymous || name, {
    message: '必須入力です',
    path: ['name'],
  })

export type RegFormSchema = z.infer<typeof regFormSchema>
