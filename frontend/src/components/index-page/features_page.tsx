import {
  Box,
  Flex,
  Text,
  useColorModeValue as mode,
  VStack,
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
    </VStack>
  );
}

export default FeaturesPage;
