import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Stack,
  Center,
  Button,
  Text,
  Tabs,
  Tab,
  TabList,
} from '@chakra-ui/react'
import { FC, useMemo, useState } from 'react'
import { PostStatus } from 'src/types/api.types'
import PostCardList from '../model/post/PostCardList'
import SearchInput from '../model/post/SearchInput'

const PostsPage: FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const [tabIndex, setTabIndex] = useState(0)

  const handleClickTab = (index: number) => {
    setTabIndex(index)
  }

  const filterStatus = useMemo(() => {
    if (tabIndex === 0) return null
    return tabIndex === 1 ? PostStatus.open : PostStatus.closed
  }, [tabIndex])

  return (
    <Box p={6} bgColor='#f2f5fa' h='calc(100vh - 64px)'>
      <Center>
        <Stack spacing={3} maxW='880px' w='full'>
          <Stack direction='row' justifyContent='space-between'>
            <SearchInput setSearchStr={setSearchStr} />
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Tabs onChange={handleClickTab}>
              <TabList>
                <Tab>All</Tab>
                <Tab>Open</Tab>
                <Tab>Closed</Tab>
              </TabList>
            </Tabs>
            <Button colorScheme='blue' w={100} size='md'>
              <AddIcon w={3} h={3} mr={1} />
              <Text>Add New</Text>
            </Button>
          </Stack>
          <PostCardList searchStr={searchStr} filterStatus={filterStatus} />
        </Stack>
      </Center>
    </Box>
  )
}

export default PostsPage
