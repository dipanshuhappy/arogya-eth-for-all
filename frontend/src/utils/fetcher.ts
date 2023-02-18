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
