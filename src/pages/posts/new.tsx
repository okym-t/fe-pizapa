import { Suspense } from 'react'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'
import PostsNew from 'src/components/page/PostsNew'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <PostsNew />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
