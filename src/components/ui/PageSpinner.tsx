import { Box, Center, Spinner } from '@chakra-ui/react'

const PageSpinner = () => {
  return (
    <Box h={400}>
      <Center h='100%'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    </Box>
  )
}

export default PageSpinner
