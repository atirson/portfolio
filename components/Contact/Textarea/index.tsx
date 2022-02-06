import { Textarea as ChakraTextarea, FormLabel, FormControl, TextareaProps as ChakraTextareaProps, FormErrorMessage } from '@chakra-ui/react'
import {forwardRef, ForwardRefRenderFunction} from 'react'
import { FieldError } from 'react-hook-form'

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraTextarea
        {...rest}
        name={name}
        id={name}
        focusBorderColor="pink.500" 
        bg="gray.900"
        variant="filled"
        ref={ref}
        _hover={{
          bgColor: 'gray.900'
        }}
        h="200"
        resize="none"
        size="lg"
        border='2px'
      />
      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Textarea = forwardRef(TextareaBase)