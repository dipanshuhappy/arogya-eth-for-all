import PageLayout from '@/components/page-layout';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

function index() {
  return (
    <PageLayout title='Sign Up' description='Sign up to med chain'>
      <Center width={'100%'} minH={'100vh'}>
        <Box width={'70%'} minHeight={'60vh'} backgroundColor='#5551FF'>
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
              <Input type='text' placeholder='phone number' />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Age' />
              <Input type='number' placeholder='phone number' />
            </InputGroup>
            <Select placeholder='Blood Group'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </VStack>
        </Box>
      </Center>
    </PageLayout>
  );
}

export default index;
