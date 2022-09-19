import { Badge, Stack } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  tags: {
    tag: { id: number; name: string }
  }[]
}

const TagList: FC<Props> = ({ tags }) => {
  return (
    <Stack direction={'row'}>
      {tags.map(({ tag }) => (
        <Badge
          key={tag.id}
          px={2}
          py={1}
          bg='gray.100'
          fontWeight={'400'}
          textTransform={'none'}
          rounded='lg'
        >
          #{tag.name}
        </Badge>
      ))}
    </Stack>
  )
}

export default TagList
