import type { NextPage } from 'next'
import About from './components/About'
import Header from './components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <About />
    </>
    
  )
}

export default Home
