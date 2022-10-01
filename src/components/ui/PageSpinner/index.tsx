import { Box, Center, Spinner, SpinnerProps } from '@chakra-ui/react'
import { FC } from 'react'

const PageSpinner: FC<SpinnerProps> = ({ ...props }) => {
  return (
    <Box h='100vh'>
      <Center h='100%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          {...props}
        />
      </Center>
    </Box>
  )
}

export default PageSpinner
