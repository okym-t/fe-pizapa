import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { Layout } from 'src/layout/headerLayout'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from 'src/layout/layout.type'

const Posts = dynamic(() => import('src/components/page/Posts'), {
  ssr: false,
})

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <Posts />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
