import { User } from '@/types/user';
import { deserialiseUser } from '@/utils/deserialise';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import useGetTokenAddress from 'src/hooks/useGetTokenAddress';
import { useContractRead } from 'wagmi';

import { abi as TokenFactoryABI } from '../../abi/TokenFactory.json';
function UserRecords() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User>({} as User);
  const { tokenAddress } = useGetTokenAddress();
  console.log({ tokenAddress });
  const { data } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryABI,
    functionName: 'getOwnerDetails',
  });
  console.log({ data });
  useEffect(() => {
    if (data) {
      setUser(deserialiseUser(data));
    }
  }, [data]);
  // const [Name, SetName] = useState("Nithin Varma")
  // const [Age, SetAge] = useState("20");
  // const [Blood, SetBlood] = useState("A+");
  // const [Allergies, SetAllergies] = useState("NIL");
  // const [Medications, SetMedications] = useState("NIL");
  // const [About, SetAbout] = useState("Nithin Varma ");

  return (
    <>
      <Box h='100vh' p={12} marginTop={'40'}>
        {/* <Center> */}
        <Card
          bgColor={'teal'}
          color={'white'}
          w={'1000px'}
          letterSpacing={'normal'}
          marginBottom={'24'}
        >
          <Stack
            spacing={'150'}
            marginInline={'auto'}
            py={12}
            align='center'
            // h='100vh'
            // minW={'90%'}
            direction={{ base: 'column', md: 'row' }}
          >
            <VStack>
              <CardHeader>
                <Heading textAlign={'start'}>{user.fullName}</Heading>
              </CardHeader>
              <CardBody>
                <VStack
                  spacing={8}
                  align='start'
                  w={{ base: '100%', md: '50%' }}
                  py={{ base: 20, md: 0 }}
                >
                  <Text as='b'>Age: {user.age}</Text>
                  <Text as='b'>Blood_Group: {user.bloodGroup}</Text>
                  <Text as='b'>Allergies: {user.allergies}</Text>
                  <Text as='b'>Medications: {user.medication}</Text>
                  <Text as='b'>About: {user.about}</Text>
                </VStack>
              </CardBody>
              <CardFooter>
                {/* <Button colorScheme="blue">Sign up</Button> */}
              </CardFooter>
            </VStack>
            <Card bgColor={'#EBECF0'} color={'black'} padding={30}>
              <CardHeader>
                <Text as='h1' textAlign={'start'}>
                  Latest Document
                </Text>
                <br />
                <Heading as='h1' textAlign={'start'}>
                  {user.fullName}
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align={'start'} spacing={8}>
                  <Text as='b'>Issued By: </Text>
                  <Text as='b'>Hospital Reference: </Text>
                  <Text as='b'>Tags: </Text>
                  <Text as='b'>Date of Issue: </Text>
                </VStack>
              </CardBody>
              <Center>
                <CardFooter>
                  <Button colorScheme='teal' variant='solid'>
                    Open File
                  </Button>
                </CardFooter>
              </Center>
            </Card>
          </Stack>

          <Button onClick={onOpen} color={'red'}>
            Upload New Document Here
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Document</ModalHeader>
              <ModalCloseButton />
              <FormControl>
                <FormLabel>Document Upload</FormLabel>
                <Input type='file' />
              </FormControl>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>

        <Heading as='u'>Previous Documents:</Heading>
        <br />
        <Card color={'white'} w={'1000px'} marginTop={'10'}>
          <Stack
            spacing={'15'}
            marginInline={'auto'}
            py={12}
            align='center'
            // h='100vh'
            // minW={'90%'}
            direction={{ base: 'column', md: 'row' }}
          >
            <HStack spacing={1} direction={{ base: 'column', md: 'row' }}>
              <Card bgColor={'#EBECF0'} color={'black'} padding={30}>
                <CardHeader>
                  <Heading textAlign={'start'}>{user.fullName}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align={'start'} spacing={8}>
                    <Text as='b'>Issued By: </Text>
                    <Text as='b'>Hospital Reference: </Text>
                    <Text as='b'>Tags: </Text>
                    <Text as='b'>Date of Issue: </Text>
                  </VStack>
                </CardBody>
                <Center>
                  <CardFooter>
                    <Button colorScheme='teal' variant='solid'>
                      Open File
                    </Button>
                  </CardFooter>
                </Center>
              </Card>
              <Image
                src={'./assets/images/chain-link-icon.svg'}
                h={'120px'}
                // w={'full'}
              />
            </HStack>

            <Card bgColor={'#EBECF0'} color={'black'} padding={30}>
              <CardHeader>
                <Heading textAlign={'start'}>{user.fullName}</Heading>
              </CardHeader>
              <CardBody>
                <VStack align={'start'} spacing={8}>
                  <Text as='b'>Issued By: </Text>
                  <Text as='b'>Hospital Reference: </Text>
                  <Text as='b'>Tags: </Text>
                  <Text as='b'>Date of Issue: </Text>
                </VStack>
              </CardBody>
              <Center>
                <CardFooter>
                  <Button colorScheme='teal' variant='solid'>
                    Open File
                  </Button>
                </CardFooter>
              </Center>
            </Card>
          </Stack>
        </Card>
      </Box>
    </>
  );
}

export default UserRecords;
