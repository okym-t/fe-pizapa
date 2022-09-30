import { Tabs, Tab, TabList } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  handleClickTab: (index: number) => void
}

const PostFilterTab: FC<Props> = ({ handleClickTab }) => {
  return (
    <Tabs onChange={handleClickTab}>
      <TabList>
        <Tab>All</Tab>
        <Tab>Open</Tab>
        <Tab>Closed</Tab>
      </TabList>
    </Tabs>
  )
}

export default PostFilterTab
