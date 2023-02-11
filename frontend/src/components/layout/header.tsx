import { Box, Button, HStack, Link, Text, useColorMode,IconButton, Icon } from '@chakra-ui/react';
import Logo from '../logo';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import WalletConnect from '../wallet-button';
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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

      <HStack spacing={6}>
      <Button onClick={toggleColorMode}>
         {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Box>
        <WalletConnect marginInline={'auto'} />
      </Box>
      </HStack>
    </HStack>
  );
};

export default Header;
