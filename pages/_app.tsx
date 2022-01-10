import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import 'react-vertical-timeline-component/style.min.css'
import '../styles/vertical-load-more.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  )
}

export default MyApp
