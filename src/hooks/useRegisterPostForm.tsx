import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { RegFormSchema } from 'src/schemas'
import { regFormSchema } from 'src/schemas'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

export const URL = '/api/post'

export const useRegisterPostForm = () => {
  const router = useRouter()

  const defaultValues = {
    name: '',
    isAnonymous: false,
    title: '',
    description: '',
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues,
    resolver: zodResolver(regFormSchema),
  })

  const onSubmit: SubmitHandler<RegFormSchema> = async (data) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      mutate(URL)
      await router.push('/')
      reset()
    } catch (error) {
      throw Error()
    }
  }

  return [register, handleSubmit, errors, onSubmit] as const
}
