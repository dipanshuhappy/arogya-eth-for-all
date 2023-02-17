import { Doc_User, MintParams, User } from '@/types/user';
import { deserialiseUser } from '@/utils/deserialise';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { NFTStorage } from 'nft.storage';
import useGetTokenAddress from 'src/hooks/useGetTokenAddress';
import useToastCustom from 'src/hooks/useToastCustom';
import {
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

import { SpinnerContext } from '@/providers/SpinnerProvider';
import { fileToBlob, getFileUrl, getMetaDataUrl } from '@/utils/converter';
import { base64 } from 'ethers/lib/utils.js';
import { CarReader } from 'nft.storage/dist/src/lib/interface';
import { EMPTY_BYTES } from 'src/data';
import useDocument from 'src/hooks/useDocument';
import useMedusa from 'src/hooks/useMedusa';
import { TokenFactoryAbi } from '../../abi/index';
interface DocumentCar {
  fileCar: CarReader;
  metadataCar: CarReader;
}
const VALID_FILE_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'application/pdf',
];
function UserProfile({ user }: { user: User }) {
  return (
    <>
      <CardHeader>
        <Heading textAlign={'start'}>{user.fullName}</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={8} align='start' w={{ base: '100%', md: '50%' }}>
          <Text as='b'>Age: {user.age}</Text>
          <Text as='b'>Blood_Group: {user.bloodGroup}</Text>
          <Text as='b'>Allergies: {user.allergies}</Text>
          <Text as='b'>Medications: {user.medication}</Text>
          <Text as='b'>About: {user.about}</Text>
        </VStack>
      </CardBody>
      <CardFooter>
        {/* <Button colorScheme="blue">Sign up</Button> */}
      </CardFooter>
    </>
  );
}
function Document({ document }: { document: Doc_User }) {
  return (
    <>
      <Card bgColor={'#EBECF0'} color={'black'} padding={30}>
        <CardHeader>
          <Heading textAlign={'start'}>{document?.title}</Heading>
        </CardHeader>
        <CardBody>
          <VStack align={'start'} spacing={8}>
            <Text as='b'>Issued By: {document?.Issued_By_Doctor} </Text>
            <Text as='b'>
              Hospital Reference: {document?.Issued_By_Hospital}
            </Text>
            <Text as='b'>Tags: {document?.Tag}</Text>
            <Text as='b'>
              Date of Issue: {document?.Date_of_Issued.toISOString()}
            </Text>
          </VStack>
        </CardBody>
        <Center>
          <CardFooter>
            <Button colorScheme='teal' variant='solid'>
              Open File
            </Button>
          </CardFooter>
        </Center>
      </Card>
    </>
  );
}
const emptyDoc = {
  Date_of_Issued: new Date(),
  Tag: '',
  title: 'title',
  Issued_By_Doctor: 'kdsf',
  Issued_By_Hospital: '',
} as Doc_User;
function UserRecords() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onOpenModal = async () => {
    if (!medusa) {
      await signInToMedusa();
    }
    onOpen();
  };
  const { data: signer } = useSigner();
  console.log({ signer });
  const OverlayOne = () => (
    <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='5px' />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [doc_user, setDoc_user] = useState<Doc_User>({} as Doc_User);
  const [user, setUser] = useState<User>({} as User);
  const { tokenAddress } = useGetTokenAddress();
  const [blob, setBlob] = useState<Blob>();
  const { medusa, signInToMedusa } = useMedusa();
  const { spinner, setSpinnerText, setSpinner } = useContext(SpinnerContext);
  console.log({ tokenAddress });
  const { data } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'getOwnerDetails',
  });

  console.log({ data });
  useEffect(() => {
    if (data) {
      setUser(deserialiseUser(data));
    }
  }, [data]);
  const { errorToast, successToast } = useToastCustom();
  const [mintData, setMintData] = useState<MintParams>();
  const [documentCar, setDocumentCar] = useState<DocumentCar>();
  const provider = useProvider();
  const { config, refetch } = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'mint',
    args: [mintData?.dataDescription, mintData?.dataUrl, mintData?.cipher],
    enabled: !!mintData,
    signer: signer,
    onSuccess() {},
  });

  const {
    data: mintContractData,
    writeAsync,
    reset,
    write,
  } = useContractWrite({ ...config, request: config.request });
  const mintContract = useContract({
    address: tokenAddress,
    abi: TokenFactoryAbi,
    signerOrProvider: signer,
  });
  console.log('mint function', { mintContract });
  console.log({ mintContractData });
  const nftStorageClient = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API,
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintContractData?.hash,
  });
  const storeCar = async () => {
    await nftStorageClient.storeCar(documentCar.fileCar);
    await nftStorageClient.storeCar(documentCar.metadataCar);
  };

  useEffect(() => {
    if (isSuccess) {
      setSpinnerText('Uploading image to ipfs using Filecoin');
      // storeCar().then(() => {

      // });
      setSpinner(false);
      successToast('Document Uploaded !');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      if (!spinner) {
        setSpinner(true);
      }
      setSpinnerText(
        'Waiting for Transaction Confirmation,Chill  it takes some time '
      );
    }
    if (!isLoading && isSuccess) {
      setSpinner(false);
    }
  }, [isLoading]);

  const onDoucmentSubmit = async () => {
    console.log('hiii');
    if (tokenAddress) {
      const { encryptedData, encryptedKey } = await medusa.encrypt(
        new Uint8Array(await blob.arrayBuffer()),
        tokenAddress as string
      );
      console.log({ encryptedKey });
      const finalData = base64.encode(encryptedData);

      console.log({ finalData });
      const fileMetaData = {
        name: `${doc_user.file.name}  ${doc_user.title} `,
        description: doc_user.title,
        image: new File([finalData], doc_user.file.name, {
          type: 'text/plain',
        }),
        properties: {
          issuerName: user.fullName,
          date: new Date().toISOString(),
          date_issued: doc_user.Date_of_Issued,
          doctor_issued_by: doc_user.Issued_By_Doctor,
          hospital_issued_by: doc_user.Issued_By_Hospital,
          tags: doc_user.Tag,
        },
      };
      // console.log({ ipfsMetaData });

      const cid = await nftStorageClient.storeBlob(
        new Blob([finalData], { type: 'text/plain' })
      );
      const fileUrl = getFileUrl(cid.toString());

      console.log({ fileUrl });
      const metaDataStorageInfo = await nftStorageClient.store(fileMetaData);
      // setDocumentCar({
      //   metadataCar: metaDataStorageCar,
      //   fileCar: blobCar,
      // });
      console.log({ metaDataStorageInfo });
      const fileDescriptionUrl = getMetaDataUrl(metaDataStorageInfo.ipnft);
      console.log({ fileDescriptionUrl });

      setMintData({
        dataUrl: fileUrl,
        dataDescription: fileDescriptionUrl,
        cipher: encryptedKey,
      });
      write?.();
      if (!write) {
        alert("If it does'nt work ,click submit button again");
      }
    }
  };
  async function onFileHandle(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    if (event.target.files.length > 1) {
      onClose();
      errorToast('Only Select One File');
      return;
    }
    let selectedFile = event.target.files[0];
    if (!VALID_FILE_TYPES.includes(selectedFile.type)) {
      onClose();
      errorToast('Only Images and PDF allowed');
      return;
    }
    setBlob(await fileToBlob(selectedFile));
    setDoc_user({
      ...doc_user,
      file: selectedFile,
    });
  }
  const { tokenIds, tokenData, docs } = useDocument();
  console.log({ tokenIds });
  console.log({ tokenData });

  console.log({ docs });
  // if (!writeAsync)
  //   return (
  //     <>
  //       <Spinner />
  //     </>
  //   );
  if (!tokenAddress || tokenAddress == EMPTY_BYTES || tokenAddress == '') {
    return <Spinner size='xl' color='red' />;
  }
  return (
    <>
      <Box h='100vh' p={12} marginTop={'40'}>
        {/* <Center> */}
        <Card
          bgColor={'teal'}
          color={'white'}
          w={'1000px'}
          letterSpacing={'normal'}
          marginBottom={'24'}
        >
          <Stack
            spacing={{ base: '', md: '200' }}
            marginInline={'auto'}
            py={12}
            align='center'
            direction={{ base: 'column', md: 'row' }}
          >
            <VStack>
              <UserProfile user={user} />
            </VStack>
            <VStack>
              <Text as='h1' textAlign={'start'}>
                Latest Document
              </Text>
              <Document document={emptyDoc} />
            </VStack>
          </Stack>
          <Center>
            <Button
              size='md'
              // border='2px'
              boxShadow={'dark-lg'}
              borderColor='black'
              marginBottom={'15'}
              colorScheme={'whatsapp'}
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpenModal();
              }}
            >
              Upload New Document Here
            </Button>
          </Center>
          <Modal size={'md'} isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Please Fill The Be Details</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                {/* <Text>Custom backdrop filters!</Text> */}
                <Stack spacing={'5'}>
                  <FormControl id='Title' isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder='title'
                      _placeholder={{ color: 'gray.500' }}
                      type='text'
                      value={doc_user.title}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          title: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='hospital_name' isRequired>
                    <FormLabel>Issued By (Hospital)</FormLabel>
                    <Input
                      type='text'
                      placeholder='hospital name here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Issued_By_Hospital}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Issued_By_Hospital: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='doctor_name' isRequired>
                    <FormLabel>Issued By (Doctor)</FormLabel>
                    <Input
                      type='text'
                      placeholder='doctor name here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Issued_By_Doctor}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Issued_By_Doctor: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='tag' isRequired>
                    <FormLabel>Tag</FormLabel>
                    <Input
                      type='text'
                      placeholder='tag here'
                      _placeholder={{ color: 'gray.500' }}
                      value={doc_user.Tag}
                      onChange={(e) => {
                        setDoc_user({
                          ...doc_user,
                          Tag: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id='issued_date' isRequired>
                    <FormLabel>Date of Issued</FormLabel>
                    <Input
                      type='Date'
                      placeholder='Issued date here'
                      _placeholder={{ color: 'gray.500' }}
                      // value={doc_user.Date_of_Issued}
                    />
                  </FormControl>
                  <FormControl id='document_upload' isRequired>
                    <FormLabel>
                      {doc_user.file
                        ? `${doc_user.file.name}`
                        : 'Upload Document Here'}
                    </FormLabel>
                    <Input
                      type='file'
                      onChange={onFileHandle}
                      accept={VALID_FILE_TYPES.join(',')}
                      placeholder='upload recent document'
                      _placeholder={{ color: 'gray.500' }}
                    />
                  </FormControl>
                  <Checkbox isRequired>
                    I am sure that I have submitted my valid document
                  </Checkbox>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <HStack spacing={'6'}>
                  <Button onClick={onClose}>Close</Button>
                  <Button onClick={onDoucmentSubmit} isLoading={isLoading}>
                    Submit
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>

        <Heading as='u'>Previous Documents:</Heading>
        <br />
        <Card color={'white'} w={'1000px'} marginTop={'10'}>
          <Stack
            spacing={'15'}
            marginInline={'auto'}
            py={12}
            align='center'
            // h='100vh'
            // minW={'90%'}
            direction={{ base: 'column', md: 'row' }}
          >
            <HStack spacing={1} direction={{ base: 'column', md: 'row' }}>
              <Document document={emptyDoc} />
              <Image
                src={'./assets/images/chain-link-icon.svg'}
                h={'120px'}
                // w={'full'}
              />
            </HStack>

            <Document document={docs[0]} />
          </Stack>
        </Card>
      </Box>
    </>
  );
}

export default UserRecords;
