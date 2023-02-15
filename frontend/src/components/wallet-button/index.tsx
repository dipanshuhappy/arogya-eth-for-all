import { Button, chakra } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SlWallet } from 'react-icons/sl';
import { EMPTY_BYTES } from 'src/data';
import useGetTokenAddress from 'src/hooks/useGetTokenAddress';
import useToastCustom from 'src/hooks/useToastCustom';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function WalletConnectMinimum() {
  const router = useRouter();
  const { successToast, errorToast } = useToastCustom();
  const { address, isConnected } = useAccount();
  const { tokenAddress } = useGetTokenAddress();

  const { connect, isSuccess } = useConnect({
    chainId: 3141,
    connector: new InjectedConnector(),

    onSuccess() {
      successToast('Account Connected !');

      console.log({ tokenAddress });
      if (tokenAddress == EMPTY_BYTES || !tokenAddress) {
        router.push('/signup');
      } else {
        router.push('/profile');
      }
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
        if (!isConnected) {
          connect();
        } else {
          if (tokenAddress == EMPTY_BYTES || !tokenAddress) {
            router.push('/signup');
          } else {
            router.push('/profile');
          }
        }
      }}
      color='brand.dark'
    >
      {isConnected && tokenAddress !== EMPTY_BYTES
        ? 'Open Profile '
        : isConnected
        ? 'Go to Sign Up'
        : 'Connect'}
    </Button>
  );
}
const WalletConnect = chakra(WalletConnectMinimum);
export default WalletConnect;
