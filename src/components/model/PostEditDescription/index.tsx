import { EditIcon } from '@chakra-ui/icons'
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
import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { mutate } from 'swr'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSession } from 'next-auth/react'

type Props = {
  postId: string
  name: string
  description: string
  avatarLink: string
}

const PostEditDescription: FC<Props> = ({
  postId,
  name,
  description: initDescription,
  avatarLink,
}) => {
  const { data: session } = useSession()
  const [canEdit, setCanEdit] = useState(false)
  const [description, setDescription] = useState(initDescription)
  const toast = useToast()

  const handleEdit = () => {
    setCanEdit(true)
  }

  const handleCancel = () => {
    setCanEdit(false)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(postId), description }),
      })
      if (!response.ok) {
        throw Error()
      }
      setCanEdit(false)
      mutate(`/api/post/${postId}`)
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
            {session && (
              <Button
                size='sm'
                colorScheme='blue'
                variant='outline'
                leftIcon={<EditIcon />}
                onClick={handleEdit}
              >
                編集
              </Button>
            )}
          </>
        )}
      </Flex>
      {canEdit ? (
        <Textarea
          rows={9}
          variant='unstyled'
          placeholder='感想とかリンクとか'
          maxLength={1000}
          value={description}
          onChange={handleChange}
        />
      ) : (
        <Box mt={2} minH={200}>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            skipHtml
            remarkPlugins={[remarkGfm]}
          >
            {description}
          </ReactMarkdown>
        </Box>
      )}
    </Box>
  )
}

export default PostEditDescription
