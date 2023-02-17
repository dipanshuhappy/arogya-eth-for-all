import { EVMCipher } from '@medusa-network/medusa-sdk/lib/src/hgamal';
import { BLOODGROUPS } from 'src/constants';
export type BLOODGROUP = (typeof BLOODGROUPS)[number];
export interface User {
  address: string;
  fullName: string;
  age: number;
  bloodGroup: BLOODGROUP;
  allergies: string;
  medication: string;
  about: string;
}
export interface Doc_User {
  title: string;
  Issued_By_Hospital: string;
  Issued_By_Doctor: string;
  Tag: string;
  Date_of_Issued: Date;
  file: File | null;
}
export interface MintParams {
  dataDescription: string;
  dataUrl: string;
  cipher: EVMCipher;
}
