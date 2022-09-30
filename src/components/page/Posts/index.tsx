import { Stack } from '@chakra-ui/react'
import { FC } from 'react'
import PostCardList from '../../model/PostCardList'
import SearchInput from '../../model/PostSearchInput'
import FilterStatusTab from '../../model/PostFilterTab.tsx'
import { PostListFilterProvider } from './PostFilterContext'
import LinkButton from 'src/components/ui/LinkButton'

const Posts: FC = () => {
  return (
    <Stack spacing={3} py={6} px={{ base: 3, sm: 36 }}>
      <PostListFilterProvider>
        <SearchInput />
        <Stack direction='row' justifyContent='space-between'>
          <FilterStatusTab />
          <LinkButton text='Add Button' path='/posts/new' colorScheme='blue' />
        </Stack>
        <PostCardList />
      </PostListFilterProvider>
    </Stack>
  )
}

export default Posts
