import PageLayout from '@/components/page-layout';
import { User } from '@/types/user';
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
import { useState } from 'react';
import { BLOODGROUPS } from 'src/constants';
function index() {
  const [user, setUser] = useState<User>({} as User);
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
              <Input
                required
                type='text'
                value={user.fullName}
                onChange={(e) => {
                  setUser({
                    ...user,
                    fullName: e.target.value,
                  });
                }}
                placeholder='phone number'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Age' />
              <Input
                value={user.age}
                onChange={(e) => {
                  9;
                  setUser({
                    ...user,
                    age: parseInt(e.target.value),
                  });
                }}
                required
                type='number'
                placeholder='Age'
              />
            </InputGroup>
            <SelectDefault required placeholder='Blood Group'>
              {BLOODGROUPS.map((group) => (
                <option value={group}>{group}</option>
              ))}
            </SelectDefault>
            <Text textAlign={'left'} width='100%' mb='8px'></Text>
            <InputGroup>
              <InputLeftAddon children='Allergies' />
              <Input
                value={user.allergies}
                onChange={(e) => {
                  setUser({
                    ...user,
                    allergies: e.target.value,
                  });
                }}
                type='text'
                placeholder='Sperate the different Allergies using comma'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Medications' />
              <Input
                value={user.medication}
                onChange={(e) => {
                  setUser({
                    ...user,
                    medication: e.target.value,
                  });
                }}
                type='text'
                placeholder='   Sperate the different medication using comma'
              />
            </InputGroup>
            <Textarea
              placeholder=' About Your self'
              size='sm'
              value={user.about}
              onChange={(e) => {
                setUser({
                  ...user,
                  about: e.target.value,
                });
              }}
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
