import { Layout } from 'src/layout/layout'
import Posts from './posts'
import { NextPageWithLayout } from './_app'

export const Top: NextPageWithLayout = () => {
  return <Posts />
}

Top.getLayout = (page) => <Layout>{page}</Layout>

export default Top
