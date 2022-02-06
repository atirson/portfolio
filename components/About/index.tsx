import { Link, Flex, Container, Heading, Text, Button, Icon, Box } from "@chakra-ui/react"
import { FiLinkedin, FiGithub } from 'react-icons/fi'
import { TiArrowRightThick } from 'react-icons/ti'
import ProfileImg from "./ProfileImg"

const About  = () => {
  return (
    <Container id="about" maxW={1480} display="flex" justifyContent="space-evenly" direction="row" h="300" p={8} mt={{ sm: 20, md: 20, '2xl': 36}}>
      <Flex direction="column" w={25} justify="center" mt={{ sm: 564, md: 2 }}>
        <Link _focus={{outline: 'none'}} href="https://www.linkedin.com/in/atirson-fabiano/" target="_blank" w={25} title="LinkedIn">
          <FiLinkedin size={25} />
        </Link>
        <Link _focus={{outline: 'none'}} href="https://github.com/atirson" target="_blank" mt="8" w={25} title="GitHub">
          <FiGithub size={25} />
        </Link>
      </Flex>
      <Flex 
        display="flex" 
        direction={["column-reverse", "column-reverse", "row", "row"]}
        justify={["center", "center", "space-between", "space-between"]}
        align={{ sm: "center", md: "flex-start", '2xl': "flex-start" }}
      >
        <Flex w={{sm: 250, md: 400, lg: 500}} direction="column" justify="center" ml={{ sm: 4, md: 12 }} mt={{ sm: 64, md: 2 }}>
          <Heading as='h2' size='2xl'>
            {`Hi, I'm Atirson Fabiano`}
          </Heading>
          <Heading as='h2' size='lg' color="gray.200" mt="2">
            Fullstack Developer
          </Heading>
          <Text mt="8"  mb="4">
            {`
              I'm 21 years old and I love everything about technology. 
              At the moment I'm focusing my studies on Node, NextJS, React and React Native with Typescript.
            `}
          </Text>
          <Text mt="2"  mb="4">
            {`
              Currently I'm living in Anápolis, Goiás - Brazil but in the future I want to have new 
              experiences and live in other countries like Canada, Ireland etc. In my free time 
              I love reading books (Sherlock Holmes is my favorite rsrsrs), practicing Karate and watching series/movies.
              I'm open to learning new languages, meeting new people and sharing knowledge.
            `}
          </Text>
          <Button 
            as={Link}
            bg="white" 
            display="flex"
            direction="row"
            justify="center"
            align="center"
            color="black" 
            maxW={200} 
            minH={10} 
            size='md'
            href="https://www.linkedin.com/in/atirson-fabiano/detail/contact-info/"
            target="_black"
            style={{ textDecoration: 'none' }}
          >
            Contact Me
            <Icon w={5} h={5} ml="2" as={TiArrowRightThick} />
          </Button>
        </Flex>
        <Flex w={{sm: 200, md: 200, lg: 700}} h={25} align="center" justify="center" mt={{ sm: 568, md: 2 }}>
          <ProfileImg />
        </Flex>
      </Flex>
    </Container>
  )
}

export default About