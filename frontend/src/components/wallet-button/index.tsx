import { Button, chakra } from '@chakra-ui/react';
import { SlWallet } from 'react-icons/sl';
function WalletConnectMinimum() {
  return (
    <Button leftIcon={<SlWallet />} variant='solid'>
      Connect
    </Button>
  );
}
const WalletConnect = chakra(WalletConnectMinimum);
export default WalletConnect;
