import { AddIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const PostAddButton = () => {
  return (
    <NextLink href='/posts/new' passHref>
      <Button as='a' colorScheme='blue' size='md'>
        <AddIcon w={3} h={3} mr={1} />
        <Text>Add New</Text>
      </Button>
    </NextLink>
  )
}

export default PostAddButton
