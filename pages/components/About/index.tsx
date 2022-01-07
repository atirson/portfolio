import { Link, Flex, Container, Heading, Image, Icon, Text } from "@chakra-ui/react"
import { FiLinkedin, FiGithub } from 'react-icons/fi'
import Svg from 'react-svg-inline'
import Blob from '../../../assets/blob.svg'

const About  = () => {
  return (
    <Container maxW={1480} display="flex" justifyContent="space-evenly" direction="row" h="300" p={8} mt={36}>
      <Flex direction="column" w={25}>
        <Link _focus={{outline: 'none'}} href="https://www.linkedin.com/in/atirson-fabiano/" target="_blank" w={25}>
          <FiLinkedin size={25} />
        </Link>
        <Link _focus={{outline: 'none'}} href="https://github.com/atirson" target="_blank" mt="8" w={25}>
          <FiGithub size={25} />
        </Link>
      </Flex>
      <Flex w={600}>
        <Heading as='h2' size='2xl'>
          {`Hi, I'm Atirson Fabiano`}
        </Heading>
      </Flex>
      <Flex w={600} h={100}>
        <div style={{
          width: '400px',
          height: '100px',
          marginLeft: '-50px'
        }}>
          <svg fill="#000" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <mask id="mask0" mask-type="alpha">
                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
            </mask>
            <g mask="url(#mask0)">
                <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                <image x="12" y="18" width="170" href="../../../assets/profile-img.png"/>
            </g>
        </svg>
        </div>
        {/* <Image height="250" position="absolute" src="../../../assets/profile-img.png" alt="Profile" /> */}
      </Flex>
    </Container>
  )
}

export default About