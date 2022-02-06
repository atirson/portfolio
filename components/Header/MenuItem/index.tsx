import { Link, Text } from '@chakra-ui/react'

const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
  return (
    <Link _focus={{outline: 'none'}} href={to} style={{ textDecoration: 'none' }}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}

export default MenuItem
