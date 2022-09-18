import { Suspense } from 'react'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'
import PostRegistration from 'src/components/page/PostRegistration'

export const NewPost: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <PostRegistration />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

NewPost.getLayout = (page) => <Layout>{page}</Layout>

export default NewPost
