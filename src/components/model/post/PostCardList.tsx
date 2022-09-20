import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useFilterPostList } from 'src/hooks/useFilterPostList'
import { usePostList } from 'src/hooks/usePost'
import { PostStatus } from 'src/types/api.types'
import PostCard from './PostCard'

type Props = {
  searchStr: string
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null
}

const PostCardList: FC<Props> = ({ searchStr, filterStatus }) => {
  const { data: posts } = usePostList()
  const [postList] = useFilterPostList(posts, searchStr, filterStatus)

  return (
    <Box>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  )
}

export default PostCardList
