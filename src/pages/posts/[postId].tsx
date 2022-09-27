import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'
import { useRouter } from 'next/router'

const PostsEdit = dynamic(() => import('src/components/page/PostsEdit'), {
  ssr: false,
})

export const Page: NextPageWithLayout = () => {
  const router = useRouter()

  const { postId } = router.query
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          {router.isReady ? (
            <PostsEdit postId={String(postId)} />
          ) : (
            <PageSpinner />
          )}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
