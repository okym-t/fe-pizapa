import { Stack, Center } from '@chakra-ui/react'
import { FC, useState } from 'react'
import PostCardList from '../../model/PostCardList'
import SearchInput from '../../model/PostSearchInput'
import { useFilterPostTab } from 'src/hooks/useFilterPostTab'
import FilterStatusTab from '../../model/PostFilterTab.tsx'
import AddPostButton from '../../model/PostAddButton'
import { PostListFilterProvider } from './PostFilterContext'

const Posts: FC = () => {
  const [handleClickTab, filterStatus] = useFilterPostTab()

  return (
    <Center p={6}>
      <Stack spacing={3} maxW='880px' w='full'>
        <PostListFilterProvider>
          <SearchInput />
          <Stack direction='row' justifyContent='space-between'>
            <FilterStatusTab handleClickTab={handleClickTab} />
            <AddPostButton />
          </Stack>
          <PostCardList filterStatus={filterStatus} />
        </PostListFilterProvider>
      </Stack>
    </Center>
  )
}

export default Posts
