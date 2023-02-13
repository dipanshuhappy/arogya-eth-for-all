import {
  Box,
  Center,
  chakra,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';

import { Trans } from 'react-i18next';
import WalletConnect from '../wallet-button';
const CustomImage = chakra(NextImage, {
  baseStyle: {
    borderRadius: 'lg',
    boxShadow:
      '#69D3FA 0px 0px 0px 2px, #69D3FA 0px 2px 3px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
  },
  shouldForwardProp: (prop) => ['src', 'alt', 'width', 'height'].includes(prop),
});
function StartingPage(props) {
  return (
    <>
      <Stack
        spacing={8}
        marginInline={'auto'}
        py={12}
        align='center'
        minW={'100%'}
        marginTop='16'
        direction={{ base: 'column', md: 'row' }}
        borderBottom={mode('3px solid #000000', '3px solid #fff')}
      >
        <VStack spacing={2} align='start' w={{ base: '100%', md: '50%' }}>
          <Heading as='h1' textAlign='left'>
            Medical Records stored in...
          </Heading>
          <Heading as='h2' width='100%' textAlign='left'>
            IPFS With{' '}
            <Text color={'orange'} width='100%' textAlign='left'>
              {'   User Ownership '}
            </Text>
          </Heading>

          {/* <Divider backgroundColor={'brand.500'} /> */}

          <Text color='gray.500' align='justify'>
            <Trans i18nKey='excerpt'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Trans>
          </Text>
          <Box alignSelf={'center'} marginTop='519px'>
            <WalletConnect />
          </Box>
        </VStack>
        <Center w={{ base: '100%', md: '50%' }}>
          <CustomImage
            src='/assets/images/safe.gif'
            width={400}
            height={500}
            alt='Cover Image'
          />
        </Center>
      </Stack>
      {/*  */}
    </>
  );
}

export default StartingPage;
