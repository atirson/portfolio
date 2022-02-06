import type { NextPage } from 'next'
import Head from 'next/head'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Skills from '../components/Skills'
import Timeline from '../components/Timeline'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="http://atirson.herokuapp.com" />
        <meta name="description" content="
          Atirson Fabiano, Software Engineer. 
          Works as a full stack developer, focusing on technologies in 
          the JavaScript and TypeScript universe." 
        />
        <title>Atirson Fabiano - Desenvolvedor</title>
      </Head>
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
