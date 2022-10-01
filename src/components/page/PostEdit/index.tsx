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
  IconButton,
  Textarea,
  Tooltip,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { PostWithTags, usePostById } from 'src/hooks/usePost'
import AddTagForm from '../../model/TagAddForm'
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { PostStatus } from 'src/types/api.types'
import { isMobile } from 'react-device-detect'
import { useConvertPostCardText } from '../../model/PostCard/hooks/useConvertPostCardText'
import { PostDeleteDialog } from 'src/components/model/PostDeleteDialog'
import PostEditTitle from 'src/components/model/PostEditTitle'

type Props = {
  postId: string
}

const PostEdit: FC<Props> = ({ postId }) => {
  const { data: post } = usePostById({
    id: postId,
  })

  const {
    title,
    isAnonymous,
    name,
    createdAt,
    updatedAt,
    status,
    description,
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

  const handleChangeStatus = () => {
    window.alert('TODO: ステータスを変更できるようにする')
  }

  return (
    <Center p={6}>
      <Box maxW='800px' w='full'>
        <Stack spacing={2}>
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
            <Tooltip
              label={
                status === PostStatus.open ? 'クローズする' : '再オープンする'
              }
              placement='top'
            >
              <IconButton
                aria-label='Change status'
                icon={<CheckCircleIcon />}
                onClick={handleChangeStatus}
              />
            </Tooltip>
            <Tooltip label='削除' placement='top'>
              <IconButton
                aria-label='Delete post'
                icon={<DeleteIcon />}
                onClick={onOpen}
              />
            </Tooltip>
          </Flex>
          <PostEditTitle postId={postId} title={title} />
          <AddTagForm
            actionType='edit'
            isLabelVisible={false}
            tags={tags}
            updateTags={updateTags}
          />
          <Box shadow='md' borderRadius='10px' bg='white' p={4}>
            <Textarea
              rows={10}
              variant='unstyled'
              placeholder='感想とかリンクとか'
              maxLength={1000}
              defaultValue={description}
            />
          </Box>
          <Box mt={1}>TODO: この下にユーザーがいい感じにコメントしていける</Box>
        </Stack>
      </Box>
      <PostDeleteDialog postId={postId} isOpen={isOpen} onClose={onClose} />
    </Center>
  )
}

export default PostEdit
