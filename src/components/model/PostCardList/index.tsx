import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useFilterPostList } from 'src/components/model/PostCardList/hooks/useFilterPostList'
import { usePostList } from 'src/hooks/usePost'
import PostCard from '../PostCard'

const PostCardList: FC = () => {
  const { data: posts } = usePostList()
  const [postList] = useFilterPostList(posts)

  return (
    <Box>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  )
}

export default PostCardList
