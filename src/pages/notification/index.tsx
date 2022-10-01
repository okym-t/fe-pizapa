import NotificationSettings from 'src/components/page/NotificationSettings'
import PageSpinner from 'src/components/ui/PageSpinner'
import { useRequireLogin } from 'src/hooks/useRequireLogin'
import { Layout } from 'src/layout/headerLayout'
import { NextPageWithLayout } from 'src/layout/layout.type'

export const Notification: NextPageWithLayout = () => {
  const [isLoading] = useRequireLogin()

  return <>{isLoading ? <PageSpinner /> : <NotificationSettings />}</>
}

Notification.getLayout = (page) => <Layout>{page}</Layout>

export default Notification
