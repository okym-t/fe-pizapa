import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import TagInput from './TagInput'

type Props = {
  actionType: 'create' | 'edit'
  isLabelVisible: boolean
  tags: string[]
  updateTags: (tags: string[]) => void
}

const AddTagForm: FC<Props> = ({
  actionType,
  isLabelVisible,
  tags,
  updateTags,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const switchInputVisible = () => {
    setIsInputVisible((value) => !value)
  }

  const [tagsForReset] = useState(tags)
  const handleCancel = () => {
    updateTags([...tagsForReset])
    setIsInputVisible(false)
  }

  const handleSave = () => {
    window.alert('TODO: PUTなげる')
    setIsInputVisible(false)
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
          <Flex color='blue.500' fontWeight={600} align='center'>
            <Button size='sm' variant='ghost' onClick={switchInputVisible}>
              <AddIcon w={3} h={3} mr={1} />
              タグを追加
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}

export default AddTagForm
