import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/ErrorBoundary'
import { Spinner } from '@chakra-ui/react'

const PostCardList = dynamic(() => import('src/components/PostCardList'), {
  ssr: false,
})

export default function Posts() {
  return (
    <ErrorBoundary FallbackComponent={<div>error!!</div>}>
      <Suspense fallback={<Spinner />}>
        <PostCardList />
      </Suspense>
    </ErrorBoundary>
  )
}
