import lighthouse from '@lighthouse-web3/sdk';
import { fetchSigner } from '@wagmi/core';

export const getAccessControlConditions = (
  address: string,
  tokenId: number
) => [
  {
    id: 3141,
    chain: 'Hyperspace',
    method: 'isUserValid',
    standardContractType: 'Custom',
    contractAddress: address,
    returnValueTest: {
      comparator: '==',
      value: 'true',
    },
    parameters: [tokenId, ':userAddress'],
    inputArrayType: ['uint256', 'address'],
    outputType: 'bool',
  },
];
export const encryptionSignatureForLighthouse = async () => {
  const signer = await fetchSigner();
  const address = await signer.getAddress();
  const messageRequested = (await lighthouse.getAuthMessage(address)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return {
    signedMessage: signedMessage,
    publicKey: address,
  };
};
