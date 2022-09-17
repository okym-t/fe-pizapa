import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { Spinner } from '@chakra-ui/react'

const RegistrationForm = dynamic(
  () => import('../components/model/post/RegistrationForm'),
  {
    ssr: false,
  }
)

export default function HomePage() {
  return (
    <ErrorBoundary FallbackComponent={<div>error!!</div>}>
      <Suspense fallback={<Spinner />}>
        <RegistrationForm />
      </Suspense>
    </ErrorBoundary>
  )
}
