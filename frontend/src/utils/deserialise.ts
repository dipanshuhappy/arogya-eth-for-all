import { BLOODGROUP, Doc_User, User } from '@/types/user';
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
export const deserialiseDoc = async (data: any): Promise<Doc_User> => {
  let response;
  let tokenDetailJson;
  try {
    response = await fetch(data[2]);
    tokenDetailJson = await response.json();
  } catch (err) {
    console.log(err);
  }
  console.log({ tokenDetailJson });

  if (tokenDetailJson) {
    return {
      cipher_id: parseInt(data[4]),
      title: tokenDetailJson['properties']['name'],
      name: tokenDetailJson['properties']['issuerName'],
      fileUrl: data[3],
      id: parseInt(data[1]),
      Tag: tokenDetailJson['description'],
      file: null,
      Date_of_Issued: new Date(tokenDetailJson['properties']['date']),
      Issued_By_Doctor: tokenDetailJson['properties']['doctor_issued_by'],
      Issued_By_Hospital: tokenDetailJson['properties']['hospital_issued_by'],
    };
  }
};
