import { Box } from '@chakra-ui/react'
import { FC, useDeferredValue, useMemo } from 'react'
import { usePostList } from 'src/hooks/usePostList'
import { PostStatus } from 'src/types/api.types'
import PostCard from './PostCard'

type Props = {
  searchStr: string
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null
}

const PostCardList: FC<Props> = ({ searchStr, filterStatus }) => {
  const { data: posts } = usePostList()
  const deferredSearchStr = useDeferredValue(searchStr)

  const deferredPostList = useMemo(
    () =>
      posts &&
      posts
        .filter(({ status }) =>
          filterStatus === null ? true : status === filterStatus
        )
        .filter(
          ({ name, title }) =>
            name.includes(deferredSearchStr) ||
            title.includes(deferredSearchStr)
        )
        .map((post) => <PostCard key={post.id} post={post} />),
    [deferredSearchStr, posts, filterStatus]
  )

  return <Box>{deferredPostList}</Box>
}

export default PostCardList
