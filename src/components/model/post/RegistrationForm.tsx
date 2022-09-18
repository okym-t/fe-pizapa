import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useRegisterPostForm } from 'src/hooks/useRegisterPostForm'

const RegistrationForm: FC = () => {
  const [register, handleSubmit, errors, onSubmit] = useRegisterPostForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FormControl isInvalid={errors.name !== undefined} isRequired>
          <FormLabel htmlFor='name'>名前</FormLabel>
          <Input bgColor='white' {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Checkbox {...register('isAnonymous')}>匿名で投稿する</Checkbox>
        </FormControl>
        <FormControl isInvalid={errors.title !== undefined} isRequired>
          <FormLabel htmlFor='title'>タイトル</FormLabel>
          <Input bgColor='white' maxLength={100} {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description !== undefined} isRequired>
          <FormLabel htmlFor='description'>内容</FormLabel>
          <Textarea
            rows={10}
            bgColor='white'
            maxLength={1000}
            placeholder='感想とかリンクとか'
            {...register('description')}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <Button w='100%' colorScheme='blue' variant='solid' type='submit'>
          登録
        </Button>
      </Stack>
    </form>
  )
}

export default RegistrationForm
