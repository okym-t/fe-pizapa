import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { RegFormSchema } from 'src/schemas'
import { regFormSchema } from 'src/schemas'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'

export const POST_URL = '/api/post'

export const useRegisterForm = () => {
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
    formState: { errors, isSubmitting },
  } = useForm<RegFormSchema>({
    defaultValues,
    resolver: zodResolver(regFormSchema),
  })

  const [tags, setTags] = useState<string[]>([])
  const updateTags = (tags: string[]) => {
    setTags(tags)
  }

  const onSubmit: SubmitHandler<RegFormSchema> = async (data) => {
    try {
      const postResponse = await fetch(POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: tags.map((tag) => ({ name: tag })),
        }),
      })
      if (!postResponse.ok) {
        throw Error()
      }
      mutate(URL)
      await router.push('/posts')
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

  return [
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    tags,
    updateTags,
  ] as const
}
