import { TokenAddressContext } from '@/providers/TokenAddressProvider';
import { Doc_User } from '@/types/user';
import { safeIntToBigNumber } from '@/utils/converter';
import { deserialiseDoc } from '@/utils/deserialise';
import { readContract } from '@wagmi/core';
import { BigNumber } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { TokenFactoryAbi } from 'src/abi';
import { useAccount, useContractRead } from 'wagmi';

export default function () {
  const { address } = useAccount();
  const { tokenAddress } = useContext(TokenAddressContext);
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [docs, setDocs] = useState<Doc_User[]>([]);
  const { data: tokenIds, refetch } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'tokenIds',
    args: [],
    watch: true,

    async onSuccess(data) {
      console.log({ tokenIds });
      const tokenIdsNum = parseInt((tokenIds as BigNumber).toString());
      const tokenInfos = [];
      for (let tokenId = 0; tokenId < tokenIdsNum; tokenId++) {
        const value = await readContract({
          address: tokenAddress as `0x${string}`,
          abi: TokenFactoryAbi,
          functionName: 'id_TokenDetailMapping',
          args: [safeIntToBigNumber(tokenId)],
        });
        tokenInfos.push(value);
      }
      if (tokenInfos.length != tokenData.length) {
        setTokenData(tokenInfos);
      }
    },
  });
  // useEffect(() => {
  //   if (tokenIds) {
  //     console.log({ tokenIds });
  //     const tokenIdsNum = parseInt((tokenIds as BigNumber).toString());
  //     const tokenInfos = [];
  //     for (let tokenId = 0; tokenId < tokenIdsNum; tokenId++) {
  //       readContract({
  //         address: tokenAddress as `0x${string}`,
  //         abi: TokenFactoryAbi,
  //         functionName: 'id_TokenDetailMapping',
  //         args: [safeIntToBigNumber(tokenId)],
  //       }).then((value) => tokenInfos.push(value));
  //     }
  //     setTokenData(tokenInfos);
  //   }
  // }, [tokenIds]);
  useEffect(() => {
    if (tokenData.length != 0) {
      let newDocs = [];
      tokenData.map((data) => {
        deserialiseDoc(data).then((doc) => {
          newDocs.push(doc);
        });
      });

      setDocs(newDocs);
    }
  }, [tokenData]);
  // const docs = useMemo(() => {
  //   let newDocs = [];
  //   tokenData.map((data) => {
  //     deserialiseDoc(data).then((doc) => {
  //       newDocs.push(doc);
  //     });
  //   });
  //   return newDocs;
  // }, [tokenData, tokenIds]);

  return { tokenIds, tokenData, docs };
}
