import { Box, Stack, Center } from '@chakra-ui/react'
import { FC, useState } from 'react'
import FilterSwitch from '../model/post/FilterSwitch'
import PostCardList from '../model/post/PostCardList'
import SearchInput from '../model/post/SearchInput'

const PostsPage: FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const [isOpenOnly, setIsOpenOnly] = useState(false)

  return (
    <Box p={6}>
      <Center>
        <Stack spacing={3} maxW={'880px'} w={'full'}>
          <Stack direction={'row'} justifyContent='space-between'>
            <SearchInput setSearchStr={setSearchStr} />
            <FilterSwitch
              isOpenOnly={isOpenOnly}
              setIsOpenOnly={setIsOpenOnly}
            />
          </Stack>
          <PostCardList searchStr={searchStr} isOpenOnly={isOpenOnly} />
        </Stack>
      </Center>
    </Box>
  )
}

export default PostsPage
