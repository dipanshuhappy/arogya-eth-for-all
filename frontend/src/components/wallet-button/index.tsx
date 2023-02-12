import { Button, chakra } from '@chakra-ui/react';
import { SlWallet } from 'react-icons/sl';
import useToastCustom from 'src/hooks/useToastCustom';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
function WalletConnectMinimum() {
  const { successToast, errorToast } = useToastCustom();
  const { address, isConnected } = useAccount();
  const { connect, isSuccess } = useConnect({
    chainId: 3141,
    connector: new InjectedConnector(),

    onSuccess() {
      successToast('Account Connected !');
    },
    onError() {
      errorToast('Error Connecting Account');
    },
  });

  return (
    <Button
      leftIcon={<SlWallet />}
      backgroundColor={'brand.500'}
      paddingInline={'2.4rem'}
      onClick={() => {
        connect();
      }}
      color='brand.dark'
    >
      {isConnected ? 'Open Profile ' : 'Connect'}
    </Button>
  );
}
const WalletConnect = chakra(WalletConnectMinimum);
export default WalletConnect;
