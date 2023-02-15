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
