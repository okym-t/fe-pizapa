import { Layout } from 'src/layout/headerLayout'
import { NextPageWithLayout } from 'src/layout/layout.type'
import Posts from './posts'

export const Page: NextPageWithLayout = () => {
  return <Posts />
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
