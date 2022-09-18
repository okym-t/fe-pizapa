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
import { Post } from '.prisma/client'
import { useConvertPostCardText } from 'src/hooks/useConvertPostCardText'

type Props = {
  post: Post
}

const PostCard: FC<Props> = ({ post }) => {
  const { name, isAnonymous, title, status, createdAt, updatedAt } = post

  const [updatedText, statusText, statusColor] = useConvertPostCardText({
    createdAt,
    updatedAt,
    status,
  })

  return (
    <Box
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
            <Link>{title}</Link>
          </Heading>
          <Stack direction={'row'}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue(statusColor, 'gray.800')}
              fontWeight={'800'}
              textTransform={'none'}
              rounded='2xl'
            >
              {statusText}
            </Badge>
            <Center>
              <Text
                fontSize={'xs'}
                color={useColorModeValue('gray.600', 'gray.800')}
              >
                {isAnonymous ? 'Anonymous' : name}
              </Text>
            </Center>
            <Center>
              <Text
                fontSize={'xs'}
                color={useColorModeValue('gray.600', 'gray.800')}
              >
                {updatedText}
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
  )
}

export default PostCard