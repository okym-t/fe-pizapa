import NotificationSettings from 'src/components/page/NotificationSettings'
import { Layout } from 'src/layout/headerLayout'
import { NextPageWithLayout } from 'src/layout/layout.type'

export const Notification: NextPageWithLayout = () => {
  return <NotificationSettings />
}

Notification.getLayout = (page) => <Layout>{page}</Layout>

export default Notification
