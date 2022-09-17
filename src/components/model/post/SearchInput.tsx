import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { FC, SyntheticEvent } from 'react'

type Props = {
  setSearchStr: (searchStr: string) => void
}

const SearchInput: FC<Props> = ({ setSearchStr }) => {
  const handleSearch = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setSearchStr(target.value)
  }

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <Search2Icon color='gray.400' />
      </InputLeftElement>
      <Input placeholder='Search' size='md' onChange={handleSearch} />
    </InputGroup>
  )
}

export default SearchInput
