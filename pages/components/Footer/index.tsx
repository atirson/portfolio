import { Container, Flex, Heading } from "@chakra-ui/react"

const Footer = () => (
  <Flex bg="black" display="flex" justifyContent="space-evenly" p={2} mt={{ sm: "12", md: 18, '2xl': 18}}>
    <Flex direction="column" align="center">
      <Heading size="xs">atirson_fabiano &copy; All rights reserved</Heading>
    </Flex>
  </Flex>
)

export default Footer