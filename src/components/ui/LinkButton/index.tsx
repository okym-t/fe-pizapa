import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

type Props = {
  path: string
  text: string
}

const LinkButton: FC<Props & ButtonProps> = ({ text, path, ...props }) => {
  return (
    <NextLink href={path} passHref>
      <Button as='a' {...props}>
        <AddIcon w={3} h={3} mr={1} />
        <Text>{text}</Text>
      </Button>
    </NextLink>
  )
}

export default LinkButton
