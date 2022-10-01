import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import { theme } from 'src/styles/theme'
import { fetcher } from 'src/lib/fetcher'
import type { AppPropsWithLayout } from 'src/layout/layout.type'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher, suspense: true }}>
          {getLayout(<Component {...pageProps} />)}
        </SWRConfig>
      </ChakraProvider>
    </SessionProvider>
  )
}
