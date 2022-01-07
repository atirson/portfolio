import { Stack, Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import Logo from "../Logo"
import MenuItem from "./MenuItem"
import MenuToggle from './MenuToggle'
import NavBarContainer from "./NavBarContainer"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return(
    <Flex bg="black" justify="center" align="center" h={['100%', '100%', 20]}>
      <NavBarContainer>
        <Logo
          w="100px"
          color={["white"]}
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "column", "row", "row"]}
            pt={[12, 4, 0, 0]}
          >
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/how">About</MenuItem>
            <MenuItem to="/">Skills</MenuItem>
            <MenuItem to="/how">Contact</MenuItem>
          </Stack> 
        </Box>
      </NavBarContainer>
    </Flex>
   
  )
}

export default Header
