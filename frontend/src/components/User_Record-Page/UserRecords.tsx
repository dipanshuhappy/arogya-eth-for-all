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
  Divider
} from "@chakra-ui/react";

import Head from "next/head";
import { useState } from "react";

function UserRecords() {

    const [Age, SetAge] = useState("20");
    const [Blood, SetBlood] = useState("A+");
    const [Allergies, SetAllergies] = useState("NIL");
    const [Medications, SetMedications] = useState("NIL");
    const [About, SetAbout] = useState("Nithin Varma ");

    return (

        <>
        <Box h="100vh" p={12} marginTop={'40'} >
            {/* <Center> */}
            <Card bgColor={'teal'} color={'white'} w={'1000px'} letterSpacing={'normal'} marginBottom={'24'}>
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
                            <Heading textAlign={'start'}>Name of The User</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack
                                spacing={8}
                                align='start'
                                w={{ base: '100%', md: '50%' }}
                                py={{ base: 20, md: 0 }}
                            >
                                <Text as='b'>Age: {Age}</Text>
                                <Text as='b'>Blood_Group: {Blood}</Text>
                                <Text as='b'>Allergies: {Allergies}</Text>
                                <Text as='b'>Medications: {Medications}</Text>
                                <Text as='b'>About: {About}</Text>
                            </VStack>

                        </CardBody>
                        <CardFooter>
                            {/* <Button colorScheme="blue">Sign up</Button> */}
                        </CardFooter>
                    </VStack>
                    <Card bgColor={'#EBECF0'} padding={30}>
                        <CardHeader>
                            <Heading textAlign={'start'}>Latest Document</Heading>
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
                                <Button colorScheme='teal' variant='solid'>Open File</Button>
                            </CardFooter>
                        </Center>
                    </Card>
                </Stack>
            </Card>
           <Divider/>
           
        <Heading as='u'>Previous Documents:</Heading>
        <Card  color={'white'} w={'1000px'}>
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
                    <Card bgColor={'#EBECF0'} padding={30}>
                        <CardHeader>
                            <Heading textAlign={'start'}>Latest Document</Heading>
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
                                <Button colorScheme='teal' variant='solid'>Open File</Button>
                            </CardFooter>
                        </Center>
                    </Card>
                    </VStack>
                    
                    <Card bgColor={'#EBECF0'} padding={30}>
                        <CardHeader>
                            <Heading textAlign={'start'}>Latest Document</Heading>
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
                                <Button colorScheme='teal' variant='solid'>Open File</Button>
                            </CardFooter>
                        </Center>
                    </Card>
                </Stack>
            </Card>
        </Box>  
        </>
        
    )

}

export default UserRecords;