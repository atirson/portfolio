import { Link, Text } from '@chakra-ui/react'

const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}

export default MenuItem
