import { Input } from '@chakra-ui/react'
import { FC, SyntheticEvent } from 'react'

type Props = {
  setSearchStr: (searchStr: string) => void
}

const SearchInput: FC<Props> = ({ setSearchStr }) => {
  const handleSearch = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setSearchStr(target.value)
  }

  return <Input placeholder='Search' size='md' onChange={handleSearch} />
}

export default SearchInput
