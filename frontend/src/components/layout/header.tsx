import { Box, Button, HStack, Link, Text } from '@chakra-ui/react';
import { SlWallet } from 'react-icons/sl';
import Logo from '../logo';
const Header = () => {
  return (
    <HStack
      as='header'
      position='fixed'
      top='0'
      px={6}
      py={4}
      zIndex='tooltip'
      justify='space-between'
      align='center'
      w='100%'
      borderBottom={'3px solid #000000'}
    >
      <HStack spacing={8}>
        <Logo width={16} height={16} />
        <Text textAlign={'left'} fontSize={'2xl'} fontWeight='bold'>
          Arogya
        </Text>
      </HStack>
      <HStack spacing={12}>
        <Link>Features</Link>
        <Link>How it works</Link>
        <Link>About Us</Link>
      </HStack>
      <Box>
        <Button leftIcon={<SlWallet />} variant='solid'>
          Connect
        </Button>
      </Box>
    </HStack>
  );
};

export default Header;
