import { Suspense } from 'react'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'
import PostNew from 'src/components/page/PostNew'
import PageSpinner from 'src/components/ui/PageSpinner'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <PostNew />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
