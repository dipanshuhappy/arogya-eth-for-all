import {
  Box,
  Center,
  chakra,
  Divider,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';

import { Trans, useTranslation } from 'react-i18next';
import WalletConnect from '../wallet-button';
const CustomImage = chakra(NextImage, {
  baseStyle: {
    borderRadius: 'lg',
    boxShadow: 'lg',
  },
  shouldForwardProp: (prop) => ['src', 'alt', 'width', 'height'].includes(prop),
});
function StartingPage(props) {
  const { t } = useTranslation();

  return (
    <Stack
      spacing={8}
      marginInline={'auto'}
      py={12}
      align='center'
      h='100vh'
      minW={'90%'}
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack
        spacing={2}
        align='start'
        w={{ base: '100%', md: '50%' }}
        py={{ base: 20, md: 0 }}
      >
        <Heading as='h1'>Medical Records stored in...</Heading>
        <Heading as='h2'>IPFS With User Ownership</Heading>
        <Divider />

        <Text color='gray.500' align='justify'>
          <Trans i18nKey='excerpt'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
  );
}

export default StartingPage;
