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
import { PostWithTags } from 'src/hooks/usePost'
import { isMobile } from 'react-device-detect'
import NextLink from 'next/link'
import { useConvertPostCardText } from './hooks/useConvertPostCardText'
import TagList from './elements/TagList'

type Props = {
  post: PostWithTags
}

const PostCard: FC<Props> = ({ post }) => {
  const {
    id,
    name,
    isAnonymous,
    title,
    status,
    avatarLink,
    createdAt,
    updatedAt,
    tags,
  } = post

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
        <Avatar size='md' name={name} src={avatarLink ?? ''} />
        <Stack direction={'column'}>
          <Heading fontSize={'md'} fontWeight={'800'}>
            <NextLink href={`/posts/${id}`} passHref>
              <Link>{title}</Link>
            </NextLink>
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
            {!isMobile && <TagList tags={tags} />}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PostCard
