import { Box } from '@chakra-ui/react'
import { FC, useDeferredValue, useMemo } from 'react'
import { usePostList } from 'src/hooks/usePostList'
import { PostStatus } from 'src/types/api.types'
import PostCard from './PostCard'

type Props = {
  searchStr: string
  isOpenOnly: boolean
}

const PostCardList: FC<Props> = ({ searchStr, isOpenOnly }) => {
  const { data: posts } = usePostList()
  const deferredSearchStr = useDeferredValue(searchStr)

  const deferredPostList = useMemo(
    () =>
      posts &&
      posts
        .filter(({ status }) =>
          isOpenOnly ? status === PostStatus.open : true
        )
        .filter(
          ({ name, title }) =>
            name.includes(deferredSearchStr) ||
            title.includes(deferredSearchStr)
        )
        .map((post) => <PostCard key={post.id} post={post} />),
    [deferredSearchStr, posts, isOpenOnly]
  )

  return <Box>{deferredPostList}</Box>
}

export default PostCardList
