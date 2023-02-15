import { Button, chakra } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SlWallet } from 'react-icons/sl';
import { ParentStorageAbi } from 'src/abi';
import { EMPTY_BYTES, PARENTCONTRACT } from 'src/data';
import useToastCustom from 'src/hooks/useToastCustom';
import { useAccount, useConnect, useContractRead } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function WalletConnectMinimum() {
  const router = useRouter();
  const { successToast, errorToast } = useToastCustom();
  const { address, isConnected } = useAccount();
  const { data: userData } = useContractRead({
    address: PARENTCONTRACT,
    abi: ParentStorageAbi,
    functionName: 'accessMapping2',
    args: [address],
  });

  const { connect, isSuccess } = useConnect({
    chainId: 3141,
    connector: new InjectedConnector(),

    onSuccess() {
      successToast('Account Connected !');

      console.log({ userData });
      if (userData == EMPTY_BYTES || !userData) {
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
          if (userData == EMPTY_BYTES || !userData) {
            router.push('/signup');
          } else {
            router.push('/profile');
          }
        }
      }}
      color='brand.dark'
    >
      {isConnected && userData !== EMPTY_BYTES ? 'Open Profile ' : 'Connect'}
    </Button>
  );
}
const WalletConnect = chakra(WalletConnectMinimum);
export default WalletConnect;
