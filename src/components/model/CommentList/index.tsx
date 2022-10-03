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
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import Comment from './elements/Comment'

const comments = [
  { id: 1, avatarLink: '', name: 'foo', content: 'dummy comment1' },
  { id: 2, avatarLink: '', name: 'bar', content: 'dummy comment2' },
]

const CommentList: FC = () => {
  const { data: session } = useSession()

  return (
    <>
      {comments.map(({ id, name, content }) => (
        <Comment key={id} name={name} content={content} />
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
          />
          <Flex justify='flex-end'>
            <Button
              size='sm'
              colorScheme='blue'
              variant='outline'
              leftIcon={<Icon as={BsCheckLg} />}
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
