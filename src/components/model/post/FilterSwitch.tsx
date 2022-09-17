import {
  Box,
  Stack,
  Center,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  isOpenOnly: boolean
  setIsOpenOnly: any
}

const FilterSwitch: FC<Props> = ({ isOpenOnly, setIsOpenOnly }) => {
  const handleSwitch = () => {
    setIsOpenOnly(!isOpenOnly)
  }

  return (
    <Box minW={100} display='flex' justifyContent='flex-end'>
      <Center>
        <FormControl display='flex' alignItems='center'>
          <FormLabel
            htmlFor='filter'
            mb='0'
            color={useColorModeValue('gray.500', 'gray.800')}
          >
            {isOpenOnly ? 'Open' : 'All'}
          </FormLabel>
          <Switch id='filter' size='lg' onChange={handleSwitch} />
        </FormControl>
      </Center>
    </Box>
  )
}

export default FilterSwitch
