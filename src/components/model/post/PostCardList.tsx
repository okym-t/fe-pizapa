import { Box } from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { usePostList } from 'src/hooks/usePostList'
import PostCard from './PostCard'

type Props = {
  deferredSearchStr: string
}

const PostCardList: FC<Props> = ({ deferredSearchStr }) => {
  const { data: posts } = usePostList()

  const deferredPostList = useMemo(
    () =>
      posts &&
      posts
        .filter(
          ({ name, title }) =>
            name.includes(deferredSearchStr) ||
            title.includes(deferredSearchStr)
        )
        .map((post) => <PostCard key={post.id} post={post} />),
    [deferredSearchStr, posts]
  )

  return <Box>{deferredPostList}</Box>
}

export default PostCardList
