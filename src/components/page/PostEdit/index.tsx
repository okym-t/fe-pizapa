import {
  Box,
  Center,
  useDisclosure,
  useColorModeValue,
  Tag,
  TagLabel,
  Stack,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { PostWithTags, usePostById } from 'src/hooks/usePost'
import AddTagForm from '../../model/TagAddForm'
import { DeleteIcon } from '@chakra-ui/icons'
import { isMobile } from 'react-device-detect'
import { useConvertPostCardText } from '../../model/PostCard/hooks/useConvertPostCardText'
import { PostDeleteDialog } from 'src/components/model/PostDeleteDialog'
import PostEditTitle from 'src/components/model/PostEditTitle'
import PostEditStatusButton from 'src/components/model/PostEditStatusButton'
import PostEditDescription from 'src/components/model/PostEditDescription'
import { useSession } from 'next-auth/react'
import CommentList from 'src/components/model/CommentList'

type Props = {
  postId: string
}

const PostEdit: FC<Props> = ({ postId }) => {
  const { data: session } = useSession()
  const { data: post } = usePostById({
    id: postId,
  })

  const {
    userId,
    title,
    isAnonymous,
    name,
    createdAt,
    updatedAt,
    status,
    description,
    avatarLink,
    tags: tagList,
  } = post as PostWithTags
  const [tags, setTags] = useState(tagList.map((tag) => tag.name))
  const updateTags = (tags: string[]) => {
    setTags(tags)
  }

  const [updatedText, statusText, statusColor] = useConvertPostCardText({
    createdAt,
    updatedAt,
    status,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Center p={6}>
      <Box maxW='800px' w='full'>
        <Stack spacing={2}>
          <Flex justify='space-between'>
            <Flex align='center' gap='2'>
              <Tag
                size='lg'
                bg={useColorModeValue(statusColor, 'gray.800')}
                fontWeight={'800'}
                borderRadius='full'
              >
                <TagLabel>{statusText}</TagLabel>
              </Tag>
              <Text
                fontSize={'md'}
                color={useColorModeValue('gray.600', 'gray.800')}
              >
                {isAnonymous ? 'Anonymous' : name}
              </Text>
              {!isMobile && <Text color='gray.600'>{updatedText}</Text>}
            </Flex>
            {session && (session?.user as any).id === userId && (
              <Stack direction='row'>
                <PostEditStatusButton postId={postId} status={status} />
                <Button
                  size='sm'
                  colorScheme='red'
                  variant='outline'
                  leftIcon={<DeleteIcon />}
                  onClick={onOpen}
                >
                  削除
                </Button>
              </Stack>
            )}
          </Flex>
          <PostEditTitle postId={postId} title={title} userId={userId} />
          <AddTagForm
            actionType='edit'
            postId={postId}
            userId={userId}
            isLabelVisible={false}
            tags={tags}
            updateTags={updateTags}
          />
        </Stack>
        <Stack spacing={4} mt={2}>
          <PostEditDescription
            postId={postId}
            userId={userId}
            name={name}
            avatarLink={avatarLink ?? ''}
            description={description}
          />
          <CommentList postId={postId} />
        </Stack>
      </Box>
      <PostDeleteDialog postId={postId} isOpen={isOpen} onClose={onClose} />
    </Center>
  )
}

export default PostEdit
