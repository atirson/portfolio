import type { NextPage } from 'next'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Skills from './components/Skills'
import Timeline from './components/Timeline'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <About />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
