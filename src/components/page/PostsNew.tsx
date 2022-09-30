import { Box, Center } from '@chakra-ui/react'
import { FC } from 'react'
import PostRegisterForm from '../model/PostRegisterForm'

const PostsNew: FC = () => {
  return (
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <PostRegisterForm />
      </Box>
    </Center>
  )
}

export default PostsNew
