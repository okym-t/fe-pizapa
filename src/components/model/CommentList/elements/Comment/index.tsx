import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  Box,
  Flex,
  Stack,
  Text,
  useToast,
  Textarea,
  Icon,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useSession } from 'next-auth/react'
import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { mutate } from 'swr'

type Props = {
  id: string
  name: string
  content: string
  avatarLink: string
  postId: string
  userId: string
}

const Comment: FC<Props> = ({
  id,
  name,
  content,
  avatarLink,
  postId,
  userId,
}) => {
  const { data: session } = useSession()
  const [canEdit, setCanEdit] = useState(false)
  const [description, setDescription] = useState(content)
  const toast = useToast()

  const handleEdit = () => {
    setCanEdit(true)
  }

  const handleCancel = () => {
    setCanEdit(false)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/post/${postId}/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(id), description }),
      })
      if (!response.ok) {
        throw Error()
      }
      await mutate(`/api/post/${postId}/comments`)
      setCanEdit(false)
      toast({
        title: '更新しました！',
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/post/${postId}/comments/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw Error()
      }
      mutate(`/api/post/${postId}/comments`)
      toast({
        title: '削除しました！',
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

  const handleChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setDescription(target.value)
  }, [])

  return (
    <Box shadow='md' borderRadius='10px' bg='white' p={4}>
      <Flex justify='space-between'>
        <Stack direction='row'>
          <Avatar size='sm' name={name} src={avatarLink} />
          <Text>{name}</Text>
        </Stack>
        {canEdit ? (
          <Stack direction='row'>
            <Button
              size='sm'
              colorScheme='blue'
              variant='outline'
              leftIcon={<Icon as={BsCheckLg} />}
              onClick={handleSave}
            >
              保存
            </Button>
            <Button
              size='sm'
              colorScheme='gray'
              variant='outline'
              color='gray.600'
              leftIcon={<ImCancelCircle />}
              onClick={handleCancel}
            >
              キャンセル
            </Button>
          </Stack>
        ) : (
          <>
            {session && (session?.user as any).id === userId && (
              <Stack direction='row'>
                <Button
                  size='sm'
                  colorScheme='blue'
                  variant='outline'
                  leftIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  編集
                </Button>
                <Button
                  size='sm'
                  colorScheme='red'
                  variant='outline'
                  leftIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  削除
                </Button>
              </Stack>
            )}
          </>
        )}
      </Flex>
      {canEdit ? (
        <Textarea
          rows={9}
          variant='unstyled'
          placeholder=''
          maxLength={1000}
          value={description}
          onChange={handleChange}
        />
      ) : (
        <Box mt={2} minH={50}>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            skipHtml
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        </Box>
      )}
    </Box>
  )
}

export default Comment
