import { Container, Heading, Flex, Image } from '@chakra-ui/react'

const Skills = () => { 
  const WIDTH_IMG = 120
  const HEIGHT_IMG = 35

  return (
    <Container maxW={1480} display="flex" justifyContent="space-evenly" direction="row" h="300" p={8} mt={{ sm: '586', md: 48, '2xl': 56}}>
      <Flex direction="column" align="center">
        <Heading>
          Skills
        </Heading>
        <Heading as='h4' size='md' color="gray.200" mt="2">
          What technologies I work or study
        </Heading>
        <Flex flexWrap="wrap" justifyContent="space-evenly" mt="8" h="200" maxW="900">
          <Image src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Javascript' />
          <Image src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Typescript' />
          <Image src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='NodeJS' />
          <Image src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB" width={WIDTH_IMG} height={HEIGHT_IMG} alt='React' />
          <Image src="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Postgres' />
          <Image src="https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm" width={WIDTH_IMG} height={HEIGHT_IMG} alt='NPM' />
          <Image src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github" width={WIDTH_IMG} height={HEIGHT_IMG} alt='GitHub' />
          <Image src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='MongoDB' />
          <Image src="https://img.shields.io/badge/php%20-%23777BB4.svg?&style=for-the-badge&logo=php&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='PHP' />
          <Image src="https://img.shields.io/badge/laravel%20-%23FF2D20.svg?&style=for-the-badge&logo=laravel&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Laravel' />
          <Image src="https://img.shields.io/badge/docker-%23316192.svg?&style=for-the-badge&logo=docker&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Docker' />
          <Image src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='NextJS' />
          <Image src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Redux' />
          <Image src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Chakra UI' />
          <Image src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Git' />
          <Image src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=azure-devops&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Azure' />
          <Image src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Heroku' />
          <Image src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='MySql' />
          <Image src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Jest' />
          <Image src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" width={WIDTH_IMG} height={HEIGHT_IMG} alt='Ubuntu' />
        </Flex>
      </Flex>
      
    </Container>
  ) 
}

export default Skills