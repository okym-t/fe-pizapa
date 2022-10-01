import { Tabs, Tab, TabList } from '@chakra-ui/react'
import { FC } from 'react'
import { usePostListFilterContext } from 'src/components/page/Posts/PostFilterContext'

const PostFilterTab: FC = () => {
  const { changeStatus } = usePostListFilterContext()

  return (
    <Tabs onChange={changeStatus}>
      <TabList>
        <Tab>All</Tab>
        <Tab>Open</Tab>
        <Tab>Closed</Tab>
      </TabList>
    </Tabs>
  )
}

export default PostFilterTab
