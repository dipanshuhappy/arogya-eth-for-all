import PageLayout from '@/components/page-layout';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select as SelectDefault,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
function index() {
  return (
    <PageLayout title='Sign Up' description='Sign up to med chain'>
      <Stack
        width={'100%'}
        spacing={8}
        marginTop='12'
        marginInline={'auto'}
        py={12}
        align='center'
        h='100vh'
        minW={'100%'}
      >
        <Box width={'70%'} backgroundColor='blue.300'>
          <Text
            textAlign={'center'}
            marginY='6'
            fontSize={'3xl'}
            fontWeight='bold'
          >
            User Bio
          </Text>
          <VStack margin={'8%'} spacing={8}>
            <InputGroup>
              <InputLeftAddon children='Full Name' />
              <Input required type='text' placeholder='phone number' />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Age' />
              <Input required type='number' placeholder='phone number' />
            </InputGroup>
            <SelectDefault required placeholder='Blood Group'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </SelectDefault>
            <Text textAlign={'left'} width='100%' mb='8px'></Text>
            <InputGroup>
              <InputLeftAddon children='Allergies' />
              <Input
                type='text'
                placeholder='Sperate the different Allergies using comma'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Medications' />
              <Input
                type='text'
                placeholder='   Sperate the different medication using comma'
              />
            </InputGroup>
            <Textarea
              placeholder=' About Your self'
              size='sm'
              resize='none'
              colorScheme={'blackAlpha'}
              variant={'filled'}
            />
            <Button>Submit</Button>
          </VStack>
        </Box>
      </Stack>
    </PageLayout>
  );
}

export default index;
