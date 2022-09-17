import { Box, Input, Stack, Center } from '@chakra-ui/react'
import { FC } from 'react'
import { usePostList } from 'src/hooks/usePostList'
import PostCard from 'src/components/model/post/PostCard'

const PostsPage: FC = () => {
  const { data: posts } = usePostList()
  return (
    <Box p={6}>
      <Center>
        <Stack spacing={3} maxW={'880px'} w={'full'}>
          <Input placeholder='Search' size='md' />
          <Box>
            {posts &&
              posts.map((post) => <PostCard key={post.id} post={post} />)}
          </Box>
        </Stack>
      </Center>
    </Box>
  )
}

export default PostsPage
