import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { RegFormSchema } from 'src/schemas'
import { regFormSchema } from 'src/schemas'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export const URL = '/api/post'

export const useRegisterPostForm = () => {
  const router = useRouter()
  const toast = useToast()

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
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw Error()
      }
      mutate(URL)
      await router.push('/')
      toast({
        title: '追加しました！',
        status: 'success',
        isClosable: true,
        position: 'top',
      })
      reset()
    } catch (error) {
      toast({
        title: 'エラーです',
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    }
  }

  return [register, handleSubmit, errors, onSubmit] as const
}
