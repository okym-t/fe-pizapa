import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'
import HeaderMenu from 'src/components/ui/HeaderMenu'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'

const PostPage = dynamic(() => import('src/components/page/PostPage'), {
  ssr: false,
})

export const Posts: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <PostPage />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Posts.getLayout = (page) => <Layout>{page}</Layout>

export default Posts
