import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { usePostById } from 'src/hooks/usePost'

const PostEdit: FC = () => {
  const router = useRouter()
  const toast = useToast()

  const { postId } = router.query
  const { data: post } = usePostById({
    id: String(postId),
    requestCondition: router.isReady,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClickDeleteButton = async () => {
    onOpen()
  }

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
    <Center p={6}>
      <Box maxW='600px' w='full'>
        <>{JSON.stringify(post)}</>
      </Box>
      <Button size='md' colorScheme='red' onClick={handleClickDeleteButton}>
        削除
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
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
    </Center>
  )
}

export default PostEdit
