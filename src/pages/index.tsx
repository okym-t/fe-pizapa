import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/ErrorBoundary'

const RegistrationForm = dynamic(
  () => import('../components/RegistrationForm'),
  {
    ssr: false,
  }
)

export default function HomePage() {
  return (
    <ErrorBoundary FallbackComponent={<h2>Could not fetch posts.</h2>}>
      <Suspense fallback={<div>hoge</div>}>
        <RegistrationForm />
      </Suspense>
    </ErrorBoundary>
  )
}
