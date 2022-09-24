import { Stack, Center } from '@chakra-ui/react'
import { FC, useState } from 'react'
import PostCardList from '../model/post/PostCardList'
import SearchInput from '../model/post/SearchInput'
import { useFilterPostTab } from 'src/hooks/useFilterPostTab'
import FilterStatusTab from '../model/post/FilterStatusTab'
import AddPostButton from '../model/post/AddPostButton'

const Posts: FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const [handleClickTab, filterStatus] = useFilterPostTab()

  return (
    <Center p={6}>
      <Stack spacing={3} maxW='880px' w='full'>
        <SearchInput setSearchStr={setSearchStr} />
        <Stack direction='row' justifyContent='space-between'>
          <FilterStatusTab handleClickTab={handleClickTab} />
          <AddPostButton />
        </Stack>
        <PostCardList searchStr={searchStr} filterStatus={filterStatus} />
      </Stack>
    </Center>
  )
}

export default Posts
