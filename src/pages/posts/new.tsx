import { Suspense } from 'react'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { Layout } from 'src/layout/headerLayout'
import PostNew from 'src/components/page/PostNew'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from 'src/layout/layout.type'
import { useRequireLogin } from 'src/hooks/useRequireLogin'

export const Page: NextPageWithLayout = () => {
  const [isLoading] = useRequireLogin()

  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          {isLoading ? <PageSpinner /> : <PostNew />}
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
