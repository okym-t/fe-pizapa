import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagLabel,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { mutate } from 'swr'
import TagInput from './elements/TagInput/Index'

type Props = {
  actionType: 'create' | 'edit'
  postId?: string
  userId?: string
  isLabelVisible: boolean
  tags: string[]
  updateTags: (tags: string[]) => void
}

const AddTagForm: FC<Props> = ({
  actionType,
  postId,
  isLabelVisible,
  tags,
  userId,
  updateTags,
}) => {
  const { data: session } = useSession()
  const toast = useToast()
  const [isInputVisible, setIsInputVisible] = useState(false)
  const switchInputVisible = () => {
    setIsInputVisible((value) => !value)
  }

  const [tagsForReset] = useState(tags)
  const handleCancel = () => {
    updateTags([...tagsForReset])
    setIsInputVisible(false)
  }

  const handleSave = async () => {
    if (!postId) return
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(postId),
          tags: tags.map((tag) => ({ name: tag })),
        }),
      })
      if (!response.ok) {
        throw Error()
      }
      setIsInputVisible(false)
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

  return (
    <>
      {isInputVisible ? (
        <Stack>
          <FormControl>
            {isLabelVisible && <FormLabel htmlFor='tag'>タグ</FormLabel>}
            <Stack p={4} border='solid' borderColor='gray.200' rounded={10}>
              <TagInput name='tag' tags={tags} updateTags={updateTags} />
              {actionType === 'edit' && (
                <Stack direction='row'>
                  <Button
                    minW={50}
                    size='sm'
                    colorScheme='blue'
                    onClick={handleSave}
                  >
                    確定
                  </Button>
                  <Button
                    maxW={100}
                    size='sm'
                    colorScheme='gray'
                    onClick={handleCancel}
                  >
                    キャンセル
                  </Button>
                </Stack>
              )}
            </Stack>
          </FormControl>
        </Stack>
      ) : (
        <>
          <Stack direction='row'>
            {tags.map((tag) => (
              <Tag
                size='md'
                key={tag}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Stack>
          {(userId
            ? session && (session?.user as any).id === userId
            : true) && (
            <Flex color='blue.500' fontWeight={600} align='center'>
              <Button size='sm' variant='ghost' onClick={switchInputVisible}>
                <AddIcon w={3} h={3} mr={1} />
                タグを追加
              </Button>
            </Flex>
          )}
        </>
      )}
    </>
  )
}

export default AddTagForm
