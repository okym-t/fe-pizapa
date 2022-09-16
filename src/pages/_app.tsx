import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { SWRConfig } from 'swr'
import { ErrorResponse } from 'src/types/api.types'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const { error } = (await res.json()) as ErrorResponse
    throw new Error(error.message)
  }

  return res.json()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher, suspense: true }}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}
