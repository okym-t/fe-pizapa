import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { Layout } from 'src/layout/headerLayout'
import { useRouter } from 'next/router'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from 'src/layout/layout.type'

const PostEdit = dynamic(() => import('src/components/page/PostEdit'), {
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
            <PostEdit postId={String(postId)} />
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
