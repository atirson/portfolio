import { Flex } from '@chakra-ui/react'

const NavBarContainer = ({ children, ...props }: any) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      maxW={1480}
      mb={8}
      p={{ sm: 4, md: 8, '2xl': 8}}
      pb={{ sm: 0 }}
      mt={{
        md: 8,
      }}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default NavBarContainer
