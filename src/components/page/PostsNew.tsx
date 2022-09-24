import { Box, Center } from '@chakra-ui/react'
import { FC } from 'react'
import PostRegistrationForm from '../model/post/PostRegistrationForm'

const PostsNew: FC = () => {
  return (
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <PostRegistrationForm />
      </Box>
    </Center>
  )
}

export default PostsNew
