import { formatBytes32String } from '@ethersproject/strings';
import { BigNumber } from 'ethers';

export const safeStringToBytes32 = (str: string | undefined | null) =>
  str ? formatBytes32String(str) : formatBytes32String('');
export const safeIntToBigNumber = (int: number | null | undefined) =>
  int ? BigNumber.from(int) : BigNumber.from(0);
