import { MedusaContext } from '@/providers/MedusaProvider';
import { Medusa } from '@medusa-network/medusa-sdk';
import { useContext } from 'react';
import { MEDUSAORACLEADDRESS } from 'src/data';
import { useSigner } from 'wagmi';

export default function () {
  const { medusa, updateMedusa } = useContext(MedusaContext);
  const { data: signer } = useSigner({ chainId: 3141 });
  const signInToMedusa = async () => {
    if (!signer) return;

    const currentMedusa = await Medusa.init(MEDUSAORACLEADDRESS, signer);
    console.log({ currentMedusa });
    await currentMedusa.signForKeypair();
    updateMedusa(currentMedusa);
  };
  const signOutMedusa = async () => {
    medusa.setKeypair(null);
  };
  return {
    signInToMedusa,
    signOutMedusa,
  };
}
