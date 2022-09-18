import NotificationSettings from 'src/components/page/NotificationSettings'
import { Layout } from 'src/layout/layout'
import { NextPageWithLayout } from '../_app'

export const Notification: NextPageWithLayout = () => {
  return <NotificationSettings />
}

Notification.getLayout = (page) => <Layout>{page}</Layout>

export default Notification
