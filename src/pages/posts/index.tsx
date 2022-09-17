import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'

const PostPage = dynamic(() => import('src/components/page/PostPage'), {
  ssr: false,
})

export default function Posts() {
  return (
    <ErrorBoundary FallbackComponent={<div>error!!</div>}>
      <Suspense fallback={<PageSpinner />}>
        <PostPage />
      </Suspense>
    </ErrorBoundary>
  )
}
