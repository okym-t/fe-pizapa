import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'
import { FC } from 'react'
import { PostStatus } from 'src/types/api.types'
import { mutate } from 'swr'

type Props = {
  postId: string
  status: number
}

const PostEditStatusButton: FC<Props> = ({ postId, status }) => {
  const toast = useToast()

  const isOpened = status === PostStatus.open

  const handleSave = async () => {
    try {
      const newStatus = isOpened ? PostStatus.closed : PostStatus.open
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(postId), status: newStatus }),
      })
      if (!response.ok) {
        throw Error()
      }
      mutate(`/api/post/${postId}`)
      toast({
        title: 'ステータスを更新しました！',
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
    <Button
      size='sm'
      colorScheme={isOpened ? 'purple' : 'green'}
      variant='outline'
      leftIcon={<CheckCircleIcon />}
      onClick={handleSave}
    >
      {isOpened ? 'クローズ' : '再オープン'}
    </Button>
  )
}

export default PostEditStatusButton
