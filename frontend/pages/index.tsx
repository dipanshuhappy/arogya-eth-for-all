import PageLayout from '@/components/page-layout';
import WalletConnect from '@/components/wallet-button';

import {
  Box,
  Center,
  chakra,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { Trans, useTranslation } from 'react-i18next';

const CustomImage = chakra(NextImage, {
  baseStyle: {
    borderRadius: 'lg',
    boxShadow: 'lg',
  },
  shouldForwardProp: (prop) => ['src', 'alt', 'width', 'height'].includes(prop),
});

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title='Home'
      description='Discover a starter kit which includes Next.js, Chakra-UI, Framer-Motion in Typescript. You have few components, Internationalization, SEO and more in this template ! Enjoy coding.'
    >
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
    </PageLayout>
  );
};

export default IndexPage;
