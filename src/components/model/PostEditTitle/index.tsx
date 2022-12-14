import { EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { mutate } from 'swr'

type Props = {
  postId: string
  title: string
  userId: string
}

const PostEditTitle: FC<Props> = ({ postId, title: initTitle, userId }) => {
  const { data: session } = useSession()
  const [cantEdit, setCanEdit] = useState(false)
  const [title, setTitle] = useState(initTitle)
  const toast = useToast()

  const handleEdit = () => {
    setCanEdit(true)
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(postId), title }),
      })
      if (!response.ok) {
        throw Error()
      }
      setCanEdit(false)
      mutate(`/api/post/${postId}`)
      toast({
        title: 'タイトルを更新しました！',
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

  const handleCancel = () => {
    setCanEdit(false)
    setTitle(initTitle)
  }

  const handleChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setTitle(target.value)
  }, [])

  return (
    <>
      {cantEdit ? (
        <Flex gap={2}>
          <Input
            variant='flushed'
            placeholder='タイトル'
            value={title}
            onChange={handleChange}
          />
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
            minW={110}
            variant='outline'
            color='gray.600'
            leftIcon={<Icon as={ImCancelCircle} />}
            onClick={handleCancel}
          >
            キャンセル
          </Button>
        </Flex>
      ) : (
        <Flex fontWeight={600} align='center' gap={1}>
          <Heading as='h1' size='lg' fontWeight='800'>
            {title}
          </Heading>
          {session && (session?.user as any).id === userId && (
            <IconButton
              aria-label='Edit title'
              icon={<EditIcon />}
              onClick={handleEdit}
            />
          )}
        </Flex>
      )}
    </>
  )
}

export default PostEditTitle
