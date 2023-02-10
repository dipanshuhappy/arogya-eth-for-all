import {
  Avatar,
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
} from '@chakra-ui/react';
import WalletConnect from '../wallet-button';


function FeaturesPage(props) {
  return (
    <VStack
      backgroundImage={'/assets/images/features_bg.png'}
      spacing={8}
      minW={'98vw'}
    >
      <Box width={'90%'} bg='white' marginInline={'auto'} marginTop='16'>
        <Flex
          zIndex='tooltip'
          justify='space-between'
          align='center'
          w='100%'
          bg={mode('white', '#2d3142')}
          borderBottom={'3px solid #000000'}
        >
          <Box marginY={4} flex={'0.5'} height={'260px'}>
            <Box
              borderRightRadius={'full'}
              width={'80%'}
              height='100%'
              bg={'blue'}
            ></Box>
          </Box>
          <Box borderLeft={'2px solid #000000'} flex={'0.5'}>
            <VStack
              width={'100%'}
              height={'100%'}
              alignItems={'baseline'}
              justifyContent='left'
              paddingLeft={'8'}
              marginY={'8'}
            >
              <Text fontWeight={'bold'} fontSize={'2xl'} textAlign={'left'}>
                Bring Your team together
              </Text>
              <Text
                justifyContent={'left'}
                fontSize={'medium'}
                textOverflow='clip'
              >
                At the heart of Slack are channels: organized spaces for
                everyone and everything you need for work. In channels, it’s
                easier to connect across departments, offices, time zones and
                even other companies.
              </Text>
              <WalletConnect />
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Box width={'90%'} bg='white' marginInline={'auto'} marginTop='16'>
        <Flex
          zIndex='tooltip'
          justify='space-between'
          align='center'
          w='100%'
          bg={mode('white', '#2d3142')}
          borderBottom={'3px solid #000000'}
        >
          <Box marginY={4} flex={'0.5'} height={'260px'}>
            <Box
              borderRightRadius={'full'}
              width={'80%'}
              height='100%'
              bg={'blue'}
            ></Box>
          </Box>
          <Box borderLeft={'2px solid #000000'} flex={'0.5'}>
            <VStack
              width={'100%'}
              height={'100%'}
              alignItems={'baseline'}
              justifyContent='left'
              paddingLeft={'8'}
              marginY={'8'}
            >
              <Text fontWeight={'bold'} fontSize={'2xl'} textAlign={'left'}>
                Bring Your team together
              </Text>
              <Text
                justifyContent={'left'}
                fontSize={'medium'}
                textOverflow='clip'
              >
                At the heart of Slack are channels: organized spaces for
                everyone and everything you need for work. In channels, it’s
                easier to connect across departments, offices, time zones and
                even other companies.
              </Text>
              <WalletConnect />
            </VStack>
          </Box>
        </Flex>
      </Box>

      <Box width={'90%'} height={'50%'} bg='white' marginInline={'auto'} marginTop={'1'} padding={'10' }borderRadius={'20' }>
      <Stack 

      spacing={40}
      marginInline={'auto'}
      py={12}
      align={'center'}
      minW={'90%'}
      direction={{ base: 'column', md: 'row' }}
      >
      <Box
        w={400}
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        padding={5}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={'/assets/images/chain.jpg'}
          objectFit={'cover'}
        /> 
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={'/assets/images/dipanshu.png'}
            // alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={10} m={1}>
          <Stack spacing={2} align={'center'} mb={5}>
            <Heading fontSize={'3xl'} fontWeight={500} fontFamily={'body'}>
              Dipanshu Singh
            </Heading>
            <Text color={'gray.500'}>Blockchain Developer</Text>
          </Stack>

          

          <Button
            w={'full'}
            mt={8}
            bg={mode('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Know more {'>>'}
          </Button>
        </Box>
      </Box>
      <Box
        // maxW={'270px'}
        w={400}
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        padding={5}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={'/assets/images/chain.jpg'}
          objectFit={'cover'}
        /> 
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={'/assets/images/nithin.png'}
            // alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={10} m={1}>
          <Stack spacing={2} align={'center'} mb={5}>
            <Heading fontSize={'3xl'} fontWeight={500} fontFamily={'body'}>
              Nithin Mengani
            </Heading>
            <Text color={'gray.500'}>Blockchain Developer</Text>
          </Stack>

          

          <Button
            w={'full'}
            mt={8}
            bg={mode('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Know more {'>>'}
          </Button>
        </Box>
      </Box>
      <Box
        // maxW={'270px'}
        w={400}
        bg={mode('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        padding={5}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={'/assets/images/chain.jpg'}
          objectFit={'cover'}
        /> 
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={'/assets/images/sudeep.jpeg'}
            // alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={10} m={1}>
          <Stack spacing={2} align={'center'} mb={5}>
            <Heading fontSize={'3xl'} fontWeight={500} fontFamily={'body'}>
              Sudeep XYZ
            </Heading>
            <Text color={'gray.500'}>Blockchain Developer</Text>
          </Stack>

          

          <Button
            w={'full'}
            mt={8}
            bg={mode('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Know more {'>>'}
          </Button>
        </Box>
      </Box>
      </Stack>
      </Box>

    </VStack>
  );
}

export default FeaturesPage;
