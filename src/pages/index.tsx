import { Layout } from 'src/layout/layout'
import Posts from './posts'
import { NextPageWithLayout } from './_app'

export const Page: NextPageWithLayout = () => {
  return <Posts />
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
