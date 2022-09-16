import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { regFormSchema } from 'src/schemas'
import type { RegFormSchema } from 'src/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import useSWR from 'swr'
import { Post } from '@prisma/client'

const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      name: '',
      isAnonymous: false,
      title: '',
      description: '',
    },
    resolver: zodResolver(regFormSchema),
  })
  const onSubmit: SubmitHandler<RegFormSchema> = async (data) => {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status !== 200) {
        console.log('error')
      } else {
        console.log('success')
        reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { data, isLoading } = useSWR<Post>('/api/post')
  if (isLoading) return <div>...loading</div>
  if (!data) return <div>error</div>

  return (
    <Box p={3} w='md' borderWidth='1px' borderRadius='lg' boxShadow='base'>
      {JSON.stringify(data)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name !== undefined} isRequired>
          <FormLabel htmlFor='username' mt={2}>
            名前
          </FormLabel>
          <Input size='md' {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Box mt={2}>
          <FormControl isInvalid={errors.isAnonymous !== undefined}>
            <Checkbox {...register('isAnonymous')}>匿名</Checkbox>
          </FormControl>
        </Box>
        <FormControl isInvalid={errors.title !== undefined} isRequired>
          <FormLabel htmlFor='title' mt={4}>
            タイトル
          </FormLabel>
          <Input size='md' maxLength={100} {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description !== undefined} isRequired>
          <FormLabel htmlFor='description' mt={4}>
            内容
          </FormLabel>
          <Textarea size='md' maxLength={1000} {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <Box mt={2}>
          <Button w='100%' colorScheme='blue' variant='solid' type='submit'>
            登録
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default RegistrationForm
