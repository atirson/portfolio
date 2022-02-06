import React from "react"
import { Box } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon as MenuIcon } from "@chakra-ui/icons"

const MenuToggle = ({ toggle, isOpen }: any) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  )
}

export default MenuToggle
