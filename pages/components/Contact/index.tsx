import { Flex, Container, Heading, Stack, Button } from "@chakra-ui/react"
import { Input } from "./Input"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Textarea } from "./Textarea"
import axios from 'axios'
import { toast } from 'react-toastify'

type ContactFormData = {
  email: string;
  name: string;
  title: string;
  message: string;
}

const contactFormSchema = yup.object().shape({
  name: yup.string().required('Name Required'),
  email: yup.string().required('E-mail Required').email('Invalid E-mail'),
  title: yup.string().required('Title Required'),
  message: yup.string().required('Message Required'),
})

const Contact = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      email: '',
      name: '',
      title: '',
      message: '',
    }
  })
  
  const { errors, isSubmitted } = formState

  const handleContact: SubmitHandler<ContactFormData> = async (values) => {
    axios.post('/api/contact', JSON.stringify(values), {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      toast.success('Message sent!');
      reset() 
    }).catch(err => {
      console.log(err.message)
      return null;
    })
  }

  return (
    <Container id="contact" maxW={1480} display="flex" justifyContent="space-evenly" p={8} mt={{ sm: "76", md: 18, '2xl': 18}}>
      <Flex as="form" direction="column" align="center" onSubmit={handleSubmit(handleContact)}>
        <Heading >
          Contact Me
        </Heading>
        <Heading as='h4' size='md' color="gray.200" mt="2">
          If you want to contact me, please use the form below
        </Heading>
        <Stack spacing="4" mt="8" w={[300, 300, 600, 600]}>
          <Input 
            type="text"
            label="Name *"
            error={errors.name}
            {...register('name')}
            borderColor={errors.name ? 'red.500' : 'white.500'}
          />
          <Input 
            type="email"
            label="E-mail *"
            error={errors.email}
            {...register('email')}
            borderColor={errors.email ? 'red.500' : 'white.500'}
          />
          <Input 
            type="text"
            label="Title *"
            error={errors.title}
            {...register('title')}
            borderColor={errors.title ? 'red.500' : 'white.500'}
          />
          <Textarea 
            label="Message *"
            error={errors.message}
            {...register('message')}
            borderColor={errors.message ? 'red.500' : 'white.500'}
          />
        </Stack>
        <Button 
          type="submit" 
          mt="6" 
          colorScheme="gray"
          color="black" 
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Send
          </Button>
      </Flex>
    </Container>
  )
}

export default Contact