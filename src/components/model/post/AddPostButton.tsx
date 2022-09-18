import { AddIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const AddPostButton = () => {
  return (
    <NextLink href='/posts/new' passHref>
      <Button colorScheme='blue' w={100} size='md'>
        <AddIcon w={3} h={3} mr={1} />
        <Text>Add New</Text>
      </Button>
    </NextLink>
  )
}

export default AddPostButton