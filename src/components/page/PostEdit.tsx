import { Box, Center } from '@chakra-ui/react'
import { FC } from 'react'
import RegistrationForm from '../model/post/RegistrationForm'
import { useRouter } from 'next/router'

const PostRegistration: FC = () => {
  const router = useRouter()
  const { postId } = router.query

  return (
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <>ID: {postId}</>
      </Box>
    </Center>
  )
}

export default PostRegistration
