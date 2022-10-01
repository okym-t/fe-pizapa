import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
  postId: string
  isOpen: boolean
  onClose: () => void
}

export const PostDeleteDialog: FC<Props> = ({ postId, isOpen, onClose }) => {
  const router = useRouter()
  const toast = useToast()

  const handleClickDeleteConfirmButton = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw Error()
      }
      onClose()
      await router.push('/posts')
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>削除</ModalHeader>
        <ModalCloseButton />
        <ModalBody>削除しますか？</ModalBody>
        <ModalFooter>
          <Button
            colorScheme='red'
            mr={3}
            onClick={handleClickDeleteConfirmButton}
          >
            削除
          </Button>
          <Button variant='ghost' onClick={onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
