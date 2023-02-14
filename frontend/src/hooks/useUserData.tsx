import { PARENTCONTRACT } from 'src/data';
import { useAccount, useContractRead } from 'wagmi';
import { abi as ParentStorageABI } from '../abi/ParentStorage.json';

// interface UseUserDataType {
//     userData : User,
// }
export default function () {
  const { address } = useAccount();
  const { data } = useContractRead({
    address: PARENTCONTRACT,
    abi: ParentStorageABI,
    functionName: 'accessMapping2',
    args: [address],
  });
  return data;
}
