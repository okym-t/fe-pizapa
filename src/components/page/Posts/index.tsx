import { Stack } from '@chakra-ui/react'
import { FC } from 'react'
import PostCardList from '../../model/PostCardList'
import SearchInput from '../../model/PostSearchInput'
import FilterStatusTab from '../../model/PostFilterTab'
import { PostListFilterProvider } from './PostFilterContext'
import LinkButton from 'src/components/ui/LinkButton'
import { useSession } from 'next-auth/react'

const Posts: FC = () => {
  const { data: session } = useSession()

  return (
    <Stack spacing={3} py={6} px={{ base: 3, sm: 36 }}>
      <PostListFilterProvider>
        <SearchInput />
        <Stack direction='row' justifyContent='space-between'>
          <FilterStatusTab />
          {session && (
            <LinkButton
              text='Add Button'
              path='/posts/new'
              colorScheme='blue'
            />
          )}
        </Stack>
        <PostCardList />
      </PostListFilterProvider>
    </Stack>
  )
}

export default Posts
