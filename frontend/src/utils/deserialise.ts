import { BLOODGROUP, User } from '@/types/user';
import { parseBytes32String } from '@ethersproject/strings';

export const deserialiseUser = (data: any): User => {
  console.log(data[2]);
  console.log(parseInt(data[2].toString()));
  return {
    fullName: parseBytes32String(data[0]),
    age: parseInt(data[2].toString()),
    address: data[1],
    bloodGroup: parseBytes32String(data[3]) as BLOODGROUP,
    allergies: parseBytes32String(data[4]),
    medication: parseBytes32String(data[5]),
    about: parseBytes32String(data[6]),
  };
};
