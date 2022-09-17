import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import { Spinner } from '@chakra-ui/react'
import { Layout } from 'src/layout/layout'
import { NextPageWithLayout } from './_app'

const RegistrationForm = dynamic(
  () => import('../components/model/post/RegistrationForm'),
  {
    ssr: false,
  }
)

export const Top: NextPageWithLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={<div>error!!</div>}>
      <Suspense fallback={<Spinner />}>
        <RegistrationForm />
      </Suspense>
    </ErrorBoundary>
  )
}

Top.getLayout = (page) => <Layout>{page}</Layout>

export default Top
