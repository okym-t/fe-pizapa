import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { usePostList } from 'src/hooks/usePostList'
import PostCard from './PostCard'

const PostCardList: FC = () => {
  const { data: posts } = usePostList()
  return (
    <Box p={6}>{posts && posts.map((post) => <PostCard key={post.id} />)}</Box>
  )
}

export default PostCardList
