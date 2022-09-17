import { Stack, Heading, Flex, Text, Image, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { memo } from 'react'

// eslint-disable-next-line react/display-name
const HeaderMenu = memo(() => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={3}
      bg='blue.600'
      color='white'
    >
      <Flex align='center' mr={8}>
        <Heading as='h1' size='md' letterSpacing={'tighter'}>
          情報共有会
        </Heading>
      </Flex>

      <Stack direction={'row'} flexGrow={1} spacing={4}>
        <NextLink href='/' passHref>
          <Text as='a' fontWeight='bold'>
            ネタ
          </Text>
        </NextLink>
        <NextLink href='/' passHref>
          <Text as='a' fontWeight='bold'>
            通知
          </Text>
        </NextLink>
      </Stack>

      <Link href='https://chakra-ui.com' isExternal>
        <Image
          borderRadius='full'
          boxSize='40px'
          src='https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png?width=64'
          alt='gitlab'
        />
      </Link>
    </Flex>
  )
})

export default HeaderMenu
