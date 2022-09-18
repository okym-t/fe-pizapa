import { Box, Stack, Center } from '@chakra-ui/react'
import { FC, useState } from 'react'
import PostCardList from '../model/post/PostCardList'
import SearchInput from '../model/post/SearchInput'
import { useFilterPostTab } from 'src/hooks/useFilterPostTab'
import FilterStatusTab from '../model/post/FilterStatusTab'
import AddPostButton from '../model/post/AddPostButton'

const PostsPage: FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const [handleClickTab, filterStatus] = useFilterPostTab()

  return (
    <Box p={6} bgColor='#f2f5fa' h='calc(100vh - 64px)'>
      <Center>
        <Stack spacing={3} maxW='880px' w='full'>
          <SearchInput setSearchStr={setSearchStr} />
          <Stack direction='row' justifyContent='space-between'>
            <FilterStatusTab handleClickTab={handleClickTab} />
            <AddPostButton />
          </Stack>
          <PostCardList searchStr={searchStr} filterStatus={filterStatus} />
        </Stack>
      </Center>
    </Box>
  )
}

export default PostsPage