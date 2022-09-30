import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { FC, SyntheticEvent } from 'react'
import { usePostListFilterContext } from 'src/components/page/Posts/PostFilterContext'

const PostSearchInput: FC = () => {
  const { updateSearchStr } = usePostListFilterContext()

  const handleSearch = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    updateSearchStr(target.value)
  }

  return (
    <InputGroup bgColor='white'>
      <InputLeftElement pointerEvents='none'>
        <Search2Icon color='gray.400' />
      </InputLeftElement>
      <Input placeholder='Search' size='md' onChange={handleSearch} />
    </InputGroup>
  )
}

export default PostSearchInput
