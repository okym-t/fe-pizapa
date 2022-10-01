import {
  Stack,
  Heading,
  Flex,
  Text,
  Box,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  List,
  ListItem,
  ListIcon,
  Link,
  Icon,
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import NextLink from 'next/link'
import { memo } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { RiGitlabFill } from 'react-icons/ri'
import { VscSignIn } from 'react-icons/vsc'

// eslint-disable-next-line react/display-name
const HeaderMenu = memo(() => {
  const { data: session, status } = useSession()

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
        <NextLink href='/posts' passHref>
          <Text as='a' fontWeight='bold'>
            ネタ
          </Text>
        </NextLink>
        {status === 'authenticated' && (
          <NextLink href='/notification' passHref>
            <Text as='a' fontWeight='bold'>
              通知
            </Text>
          </NextLink>
        )}
      </Stack>

      <Box>
        {session ? (
          <>
            <Popover closeOnBlur>
              <PopoverTrigger>
                <Avatar
                  size='sm'
                  name={session.user?.name ?? ''}
                  src={session.user?.image ?? ''}
                  cursor='pointer'
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent maxW={40}>
                  <PopoverArrow />
                  <PopoverHeader fontWeight='bold'>
                    {session.user?.name}
                  </PopoverHeader>
                  <PopoverBody>
                    <List spacing={3}>
                      <ListItem
                        cursor='pointer'
                        onClick={() => signOut()}
                        color='gray.600'
                      >
                        <ListIcon as={FiLogOut} color='gray.500' />
                        ログアウト
                      </ListItem>
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
        ) : (
          <Button
            leftIcon={<Icon as={VscSignIn} />}
            colorScheme='blue'
            variant='ghost'
            bgColor='white'
            size='sm'
            onClick={() => signIn('google')}
          >
            SignIn
          </Button>
        )}
      </Box>

      {status === 'authenticated' && (
        <Link href='https://gitlab.com/gitlab-org/gitlab' isExternal>
          <Icon as={RiGitlabFill} w={8} h={8} ml={3} pt={1} />
        </Link>
      )}
    </Flex>
  )
})

export default HeaderMenu
