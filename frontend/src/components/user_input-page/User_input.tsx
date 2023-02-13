import { LinkIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  useColorModeValue as mode,
  VStack,
  Center,
  HStack,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  extendTheme,
  Divider,
  Avatar,
  AvatarBadge,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  useColorModeValue
} from "@chakra-ui/react";

import Head from "next/head";
import { useState } from "react";

function UserInput() {

    const [UserName, SetUserName] = useState("");
    const [Age, SetAge] = useState("");
    const [Blood, SetBlood] = useState("");
    const [Allergies, SetAllergies] = useState("");
    const [Medications, SetMedications] = useState("");
    const [About, SetAbout] = useState("");

    return (

<>
    <Flex
      minH={'100vh'}
      minW={"1000%"}
      marginTop={'100'}
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={8}
        w={'full'}
        maxW={'md'}
       
        // bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base:'4xl', sm: '3xl' }}>
          Enter Your Details Here
        </Heading>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="age" isRequired >
          <FormLabel fontSize={{ base:'4xl', sm: 'xl' }}>Age</FormLabel>
          <Input
            placeholder="Age"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            fontSize={{ base:'4xl', sm: 'xl' }}
            blockSize={{base:'20', sm:'10'}}
          />
        </FormControl>
        <FormControl id="blood group" isRequired>
          <FormLabel>Blood Group</FormLabel>
          <Input
            placeholder="Blood Group"
            _placeholder={{ 
                color: 'gray.500'
             }}
            type="text"
          />
        </FormControl>
        <FormControl id='allergies' isRequired> 
            <FormLabel>Allergies</FormLabel>
            <Input 
            placeholder="In case of Nothing write NIL"
            _placeholder={{
                color:'gray.500'
            }}
            />
        </FormControl>
        <FormControl id='medications' isRequired> 
            <FormLabel>Medications</FormLabel>
            <Input 
            placeholder="In case of Nothing write NIL"
            _placeholder={{
                color:'gray.500'
            }}
            />
        </FormControl>
        <FormControl id="document" isRequired>
            <FormLabel>Recent Medical Document</FormLabel>
            <Input
            placeholder="upload here"
            type='file'
            // htmlSize={"100"}
            size={'lg'}
            // width='auto'
            />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Reset
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
        </>
        
    )

}

export default UserInput;