import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { FC, Suspense, useState } from 'react'
import TagInput from './TagInput'

type Props = {
  tags: string[]
  updateTags: (tags: string[]) => void
}

const AddTagForm: FC<Props> = ({ tags, updateTags }) => {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const handleClickShowTagInputButton = () => {
    setIsInputVisible(true)
  }

  return (
    <>
      {isInputVisible ? (
        <FormControl>
          <FormLabel htmlFor='tag'>タグ</FormLabel>
          <Suspense>
            <TagInput name='tag' tags={tags} updateTags={updateTags} />
          </Suspense>
        </FormControl>
      ) : (
        <Flex color='blue.500' fontWeight={600} align='center'>
          <Button
            size='sm'
            variant='ghost'
            onClick={handleClickShowTagInputButton}
          >
            <AddIcon w={3} h={3} mr={1} />
            タグを追加
          </Button>
        </Flex>
      )}
    </>
  )
}

export default AddTagForm
