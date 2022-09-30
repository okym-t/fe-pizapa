import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useFilterPostList } from 'src/components/model/PostCardList/hooks/useFilterPostList'
import { usePostList } from 'src/hooks/usePost'
import { PostStatus } from 'src/types/api.types'
import PostCard from '../PostCard'

type Props = {
  filterStatus: typeof PostStatus[keyof typeof PostStatus] | null
}

const PostCardList: FC<Props> = ({ filterStatus }) => {
  const { data: posts } = usePostList()

  const [postList] = useFilterPostList(posts, filterStatus)

  return (
    <Box>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  )
}

export default PostCardList
