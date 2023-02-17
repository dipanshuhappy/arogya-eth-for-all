import { formatBytes32String } from '@ethersproject/strings';
import { BigNumber } from 'ethers';

export const safeStringToBytes32 = (str: string | undefined | null) =>
  str ? formatBytes32String(str) : formatBytes32String('');
export const safeIntToBigNumber = (int: number | null | undefined) =>
  int ? BigNumber.from(int) : BigNumber.from(0);
export const fileToBlob = async (file: File) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
export const getFileUrl = (cid: string) =>
  `https://${cid}.ipfs.nftstorage.link/`;
export const getMetaDataUrl = (cid: string) =>
  `https://${cid}.ipfs.nftstorage.link/metadata.json`;
