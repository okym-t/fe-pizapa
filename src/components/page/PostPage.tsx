import { Box, Stack, Center } from '@chakra-ui/react'
import { FC, useDeferredValue, useState } from 'react'
import PostCardList from '../model/post/PostCardList'
import SearchInput from '../model/post/SearchInput'

const PostsPage: FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const deferredSearchStr = useDeferredValue(searchStr)

  return (
    <Box p={6}>
      <Center>
        <Stack spacing={3} maxW={'880px'} w={'full'}>
          <SearchInput setSearchStr={setSearchStr} />
          <PostCardList deferredSearchStr={deferredSearchStr} />
        </Stack>
      </Center>
    </Box>
  )
}

export default PostsPage
