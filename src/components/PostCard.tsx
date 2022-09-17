import { FC } from 'react'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  Link,
  Badge,
} from '@chakra-ui/react'

const PostCard: FC = () => {
  return (
    <Center>
      <Box
        maxW={'880px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        p={5}
        border='1px'
        borderColor='gray.200'
      >
        <Stack direction={'row'}>
          <Avatar
            size={'md'}
            // TODO: ユーザーごとのアイコン
            src={''}
          />
          <Stack direction={'column'}>
            <Heading fontSize={'md'} fontWeight={'800'}>
              <Link>シルバーウィーク引きこもってアプリを作った話</Link>
            </Heading>
            <Stack direction={'row'}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue('green.200', 'gray.800')}
                fontWeight={'800'}
                textTransform={'none'}
                rounded='2xl'
              >
                Open
              </Badge>
              <Center>
                <Text
                  fontSize={'xs'}
                  color={useColorModeValue('gray.600', 'gray.800')}
                >
                  Anonymous
                </Text>
              </Center>
              <Center>
                <Text
                  fontSize={'xs'}
                  color={useColorModeValue('gray.600', 'gray.800')}
                >
                  3日前にコメント追加
                </Text>
              </Center>
              <Stack direction={'row'}>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  fontWeight={'400'}
                  textTransform={'none'}
                  rounded='lg'
                >
                  #<Link>Next.js</Link>
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  fontWeight={'400'}
                  textTransform={'none'}
                  rounded='lg'
                >
                  #<Link>Prisma</Link>
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue('gray.100', 'gray.800')}
                  fontWeight={'400'}
                  textTransform={'none'}
                  rounded='lg'
                >
                  #<Link>PlanetScale</Link>
                </Badge>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

export default PostCard
