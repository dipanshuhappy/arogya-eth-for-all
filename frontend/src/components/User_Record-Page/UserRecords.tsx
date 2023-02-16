import { Doc_User, User } from '@/types/user';
import { deserialiseUser } from '@/utils/deserialise';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
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

import { ChangeEvent, useEffect, useState } from 'react';

import useGetTokenAddress from 'src/hooks/useGetTokenAddress';
import useToastCustom from 'src/hooks/useToastCustom';
import { useContractRead, useSigner } from 'wagmi';

import { abi as TokenFactoryABI } from '../../abi/TokenFactory.json';
const VALID_FILE_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'application/pdf',
];
function UserRecords() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: signer } = useSigner();
  console.log({ signer });
  const OverlayOne = () => (
    <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='5px' />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [doc_user, setDoc_user] = useState<Doc_User>({} as Doc_User);
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
  const { errorToast } = useToastCustom();
  const onDoucmentSubmit = () => {};

  function onFileHandle(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files.length > 1) {
      onClose();
      errorToast('Only Select One File');
      return;
    }
    let selectedFile = event.target.files[0];
    if (!VALID_FILE_TYPES.includes(selectedFile.type)) {
      onClose();
      errorToast('Only Images and PDF allowed');
      return;
    }
    setDoc_user({
      ...doc_user,
      file: selectedFile,
    });
  }

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
            spacing={{ base: '', md: '200' }}
            marginInline={'auto'}
            py={12}
            align='center'
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
                  // py={{ base: 20, md: 0 }}
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
                  "fksldjf"
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
          <Center>
            <Button
              size='md'
              // border='2px'
              boxShadow={'dark-lg'}
              borderColor='black'
              marginBottom={'15'}
              colorScheme={'whatsapp'}
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              Upload New Document Here
            </Button>
          </Center>
          <Modal size={'md'} isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Please Fill The Be Details</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                {/* <Text>Custom backdrop filters!</Text> */}
                <Stack spacing={'5'}>
                  <FormControl id='Title' isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder='title'
                      _placeholder={{ color: 'gray.500' }}
                      type='text'
                      value={doc_user.title}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          title: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='hospital_name' isRequired>
                    <FormLabel>Issued By (Hospital)</FormLabel>
                    <Input
                      type='text'
                      placeholder='hospital name here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Issued_By_Hospital}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Issued_By_Hospital: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='doctor_name' isRequired>
                    <FormLabel>Issued By (Doctor)</FormLabel>
                    <Input
                      type='text'
                      placeholder='doctor name here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Issued_By_Doctor}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Issued_By_Doctor: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='tag' isRequired>
                    <FormLabel>Tag</FormLabel>
                    <Input
                      type='text'
                      placeholder='tag here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Tag}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Tag: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='issued_date' isRequired>
                    <FormLabel>Date of Issued</FormLabel>
                    <Input
                      type='Date'
                      placeholder='Issued date here'
                      _placeholder={{ color: 'gray.500' }}
                      // value={doc_user.Date_of_Issued}
                    />
                  </FormControl>
                  <FormControl id='document_upload' isRequired>
                    <FormLabel>
                      {doc_user.file
                        ? `${doc_user.file.name}`
                        : 'Upload Document Here'}
                    </FormLabel>
                    <Input
                      type='file'
                      onChange={onFileHandle}
                      accept={VALID_FILE_TYPES.join(',')}
                      placeholder='upload recent document'
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </FormControl>
                  <Checkbox isRequired>
                    I am sure that I have submitted my valid document
                  </Checkbox>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <HStack spacing={'6'}>
                  <Button onClick={onClose}>Close</Button>
                  <Button onClick={onDoucmentSubmit}>Submit</Button>
                </HStack>
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
