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
import TagAddForm from '../TagAddForm'
import { useRegisterForm } from './hooks/useRegisterForm'

const PostRegisterForm: FC = () => {
  const [
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    tags,
    updateTags,
  ] = useRegisterForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl isInvalid={errors.name !== undefined}>
          <FormLabel htmlFor='name'>名前</FormLabel>
          <Input id='name' bgColor='white' {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Checkbox {...register('isAnonymous')}>匿名で投稿する</Checkbox>
        </FormControl>
        <FormControl isInvalid={errors.title !== undefined}>
          <FormLabel htmlFor='title'>タイトル</FormLabel>
          <Input
            id='title'
            bgColor='white'
            maxLength={100}
            {...register('title')}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <TagAddForm
          actionType='create'
          isLabelVisible
          tags={tags}
          updateTags={updateTags}
        />
        <FormControl isInvalid={errors.description !== undefined}>
          <FormLabel htmlFor='description'>内容</FormLabel>
          <Textarea
            id='description'
            rows={10}
            bgColor='white'
            maxLength={1000}
            placeholder='感想とかリンクとか'
            {...register('description')}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <Button
          w='100%'
          colorScheme='blue'
          variant='solid'
          type='submit'
          isLoading={isSubmitting}
        >
          登録
        </Button>
      </Stack>
    </form>
  )
}

export default PostRegisterForm
