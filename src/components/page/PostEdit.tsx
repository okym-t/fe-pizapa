import { Box, Center } from '@chakra-ui/react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { usePostById } from 'src/hooks/usePost'

const PostRegistration: FC = () => {
  const router = useRouter()
  const { postId } = router.query
  const { data: post } = usePostById({
    id: String(postId),
    requestCondition: router.isReady,
  })

  return (
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <>{JSON.stringify(post)}</>
      </Box>
    </Center>
  )
}

export default PostRegistration
