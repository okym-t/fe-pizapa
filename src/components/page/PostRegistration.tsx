import { Box, Center } from '@chakra-ui/react'
import { FC } from 'react'
import RegistrationForm from '../model/post/RegistrationForm'

const PostRegistration: FC = () => {
  return (
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <RegistrationForm />
      </Box>
    </Center>
  )
}

export default PostRegistration
