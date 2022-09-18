import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        backgroundColor: '#f2f5fa',
      },
      html: {
        height: '100%',
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: 'white',
        },
      },
    },
  },
})
