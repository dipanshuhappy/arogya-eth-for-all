import PageLayout from '@/components/page-layout';
import { User } from '@/types/user';
import { safeIntToBigNumber, safeStringToBytes32 } from '@/utils/converter';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select as SelectDefault,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BLOODGROUPS } from 'src/constants';
import { BASEURI, PARENTCONTRACT } from 'src/data';
import useToastCustom from 'src/hooks/useToastCustom';
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi as ParentStorageABI } from '../abi/ParentStorage.json';
function index() {
  const [user, setUser] = useState<User>({} as User);
  // console.log({ user });
  const [enable, setEnable] = useState(false);
  const { config } = usePrepareContractWrite({
    address: PARENTCONTRACT,
    abi: ParentStorageABI,
    functionName: 'deployNFT',
    args: [
      safeStringToBytes32(BASEURI) as `0x${string}`,
      safeStringToBytes32(user?.fullName) as `0x${string}`,
      safeIntToBigNumber(user?.age),
      safeStringToBytes32(user?.bloodGroup) as `0x${string}`,
      safeStringToBytes32(user?.allergies) as `0x${string}`,
      safeStringToBytes32(user?.medication) as `0x${string}`,
      safeStringToBytes32(user?.about) as `0x${string}`,
    ],
    enabled: enable,
  });
  const { successToast } = useToastCustom();
  const { data, write, writeAsync } = useContractWrite(config);
  const { data: dataRead } = useContract({
    address: PARENTCONTRACT,
    abi: ParentStorageABI,
  });
  const { address } = useAccount();
  console.log({ dataRead });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const contractRead = useContractRead({
    address: PARENTCONTRACT,
    abi: ParentStorageABI,
    functionName: 'accessMapping2',
    args: [address],
  });
  console.log({ contractRead });
  const submit = () => {
    console.log({ dataRead });
    setEnable(!enable);
    console.log({ data });
    write?.();
    if (isSuccess) {
      successToast('User data stored and NFT factory deployed');
    }
  };

  return (
    <PageLayout title='Sign Up' description='Sign up page for medchain'>
      <>
        <Flex
          minW={'100%'}
          marginTop={'100'}
          align={'center'}
          justify={'center'}
        >
          <Stack
            spacing={8}
            w={'full'}
            maxW={'md'}
            boxShadow={
              '#69D3FA 0px 0px 0px 2px, #69D3FA 0px 2px 3px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'
            }
            // bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: '4xl', sm: '3xl' }}>
              Enter Your Details Here
            </Heading>
            <FormControl id='userName' isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder='Full Name'
                _placeholder={{ color: 'gray.500' }}
                type='text'
                value={user.fullName}
                onChange={(e) => {
                  setUser({
                    ...user,
                    fullName: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormControl id='age' isRequired>
              <FormLabel fontSize={{ base: '4xl', sm: 'xl' }}>Age</FormLabel>
              <Input
                value={user.age}
                onChange={(e) => {
                  setUser({
                    ...user,
                    age: parseInt(e.target.value),
                  });
                }}
                placeholder='Age'
                _placeholder={{ color: 'gray.500' }}
                type='number'
                fontSize={{ base: '4xl', sm: 'xl' }}
                blockSize={{ base: '20', sm: '10' }}
              />
            </FormControl>
            <FormControl id='blood group' isRequired>
              <FormLabel>Blood Group</FormLabel>
              <SelectDefault required placeholder='Blood Group'>
                {BLOODGROUPS.map((group) => (
                  <option value={group}>{group}</option>
                ))}
              </SelectDefault>
            </FormControl>
            <FormControl id='allergies' isRequired>
              <FormLabel>Allergies</FormLabel>
              <Input
                value={user.allergies}
                onChange={(e) => {
                  setUser({
                    ...user,
                    allergies: e.target.value,
                  });
                }}
                placeholder='In case of Nothing write NIL'
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </FormControl>
            <FormControl id='medications' isRequired>
              <FormLabel>Medications</FormLabel>
              <Input
                value={user.medication}
                onChange={(e) => {
                  setUser({
                    ...user,
                    medication: e.target.value,
                  });
                }}
                placeholder='In case of Nothing write NIL'
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </FormControl>
            <FormControl id='about'>
              <FormLabel>Recent Medical Document</FormLabel>
              <Textarea
                placeholder=' About Your self'
                size='sm'
                value={user.about}
                onChange={(e) => {
                  setUser({
                    ...user,
                    about: e.target.value,
                  });
                }}
                resize='none'
                colorScheme={'blackAlpha'}
                variant={'filled'}
              />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'red.500',
                }}
                onClick={() => {
                  setUser({} as User);
                }}
              >
                Reset
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={submit}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </>
    </PageLayout>
  );
}

export default index;
