import { AddIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import Comment from './elements/Comment'
import useSWR, { mutate } from 'swr'

type Props = {
  postId: string
}

const CommentList: FC<Props> = ({ postId }) => {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const toast = useToast()
  const { data: comments } = useSWR<
    {
      id: string
      name: string
      avatarLink: string
      content: string
      userId: string
    }[]
  >(`/api/post/${postId}/comments`)

  const handlePost = async () => {
    try {
      const postResponse = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          name: session?.user?.name,
          avatarLink: session?.user?.image,
          content,
          userId: (session?.user as any).id,
        }),
      })
      if (!postResponse.ok) {
        throw Error()
      }
      mutate(`/api/post/${postId}/comments`)
      setContent('')
      toast({
        title: '追加しました！',
        status: 'success',
        isClosable: true,
        position: 'top',
      })
    } catch (error) {
      toast({
        title: 'エラーです',
        status: 'error',
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <>
      {comments &&
        comments.map(({ id, name, content, avatarLink, userId }) => (
          <Comment
            key={id}
            id={id}
            name={name}
            content={content}
            avatarLink={avatarLink}
            postId={postId}
            userId={userId}
          />
        ))}
      {session && (
        <Box shadow='md' borderRadius='10px' bg='white' p={4}>
          <Flex justify='space-between'>
            <Stack direction='row'>
              <Avatar
                size='sm'
                name={session?.user?.name ?? ''}
                src={session?.user?.image ?? ''}
              />
              <Text>{session?.user?.name}</Text>
            </Stack>
          </Flex>
          <Textarea
            rows={3}
            variant='unstyled'
            placeholder='記事に対するコメント'
            maxLength={1000}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Flex justify='flex-end'>
            <Button
              disabled={content === ''}
              size='sm'
              colorScheme='blue'
              variant='outline'
              leftIcon={<Icon as={BsCheckLg} />}
              onClick={handlePost}
            >
              投稿
            </Button>
          </Flex>
        </Box>
      )}
    </>
  )
}

export default CommentList
