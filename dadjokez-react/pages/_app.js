import Layout from '../components/layouts/main'
import Fonts from '../components/core/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/core/chakra'

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </Chakra>
  )
}

export default Website
