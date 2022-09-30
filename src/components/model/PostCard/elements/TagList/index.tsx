import { Badge, Stack } from '@chakra-ui/react'
import { FC } from 'react'
import { Tag } from 'src/hooks/usePost'

type Props = {
  tags: Tag[]
}

const TagList: FC<Props> = ({ tags }) => {
  return (
    <Stack direction={'row'}>
      {tags.map(({ id, name }) => (
        <Badge
          key={id}
          px={2}
          py={1}
          bg='gray.100'
          fontWeight={'400'}
          textTransform={'none'}
          rounded='lg'
        >
          #{name}
        </Badge>
      ))}
    </Stack>
  )
}

export default TagList
