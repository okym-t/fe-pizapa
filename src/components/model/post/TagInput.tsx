import {
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Stack,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Flex,
} from '@chakra-ui/react'
import { FC, Suspense, useMemo } from 'react'
import { useInputTag } from 'src/hooks/useInputTag'
import useSWR from 'swr'

type Props = {
  name: string
  tags: string[]
  updateTags: (tags: string[]) => void
}

const TagInput: FC<Props> = ({ name, tags, updateTags }) => {
  const [
    initialFocusRef,
    handleRemoveTag,
    handleChange,
    handleKeyDown,
    handleClickBadge,
    inputValue,
  ] = useInputTag(name, tags, updateTags)

  const ExistingTagList = () => {
    const { data } = useSWR('/api/tag')
    const tagsFilteredByText = useMemo(() => {
      if (!data) return []
      return data.filter(
        (tag: { id: number; name: string }) =>
          tag.name.includes(inputValue) && !tags.includes(tag.name)
      )
    }, [data])

    return (
      <Flex flexDirection='row' flexWrap='wrap'>
        {tagsFilteredByText.map((tag: { id: number; name: string }) => (
          <Button
            key={tag.id}
            size='xs'
            colorScheme='gray'
            variant='solid'
            onClick={() => handleClickBadge(tag)}
            m={1}
          >
            #{tag.name}
          </Button>
        ))}
      </Flex>
    )
  }

  return (
    <Stack p={4} border='solid' borderColor='gray.200' rounded={10}>
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
            <TagCloseButton onClick={handleRemoveTag(tag)} />
          </Tag>
        ))}
      </Stack>
      <Popover
        placement='bottom-start'
        initialFocusRef={initialFocusRef as any}
      >
        <PopoverTrigger>
          <Input
            ref={initialFocusRef as any}
            name={name}
            bgColor='white'
            placeholder='Enterでタグを追加'
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          ></Input>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverBody minH={50}>
              <Suspense>
                <ExistingTagList />
              </Suspense>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Stack>
  )
}

export default TagInput
