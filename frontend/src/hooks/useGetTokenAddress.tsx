import { ParentStorageAbi } from 'src/abi';
import { PARENTCONTRACT } from 'src/data';
import { useAccount, useContractRead } from 'wagmi';

// interface UseUserDataType {
//     userData : User,
// }
export default function () {
  const { address } = useAccount();
  const { data: tokenAddress, refetch } = useContractRead({
    address: PARENTCONTRACT,
    abi: ParentStorageAbi,
    functionName: 'accessMapping2',
    args: [address],
  });
  return { tokenAddress, refetch };
}
