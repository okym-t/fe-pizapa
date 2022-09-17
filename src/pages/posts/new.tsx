import { Suspense } from 'react'
import ErrorBoundary from 'src/components/functional/ErrorBoundary'
import PageSpinner from 'src/components/ui/PageSpinner'
import { NextPageWithLayout } from '../_app'
import { Layout } from 'src/layout/layout'
import RegistrationForm from 'src/components/model/post/RegistrationForm'

export const NewPost: NextPageWithLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={<div>error!!</div>}>
        <Suspense fallback={<PageSpinner />}>
          <RegistrationForm />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

NewPost.getLayout = (page) => <Layout>{page}</Layout>

export default NewPost
