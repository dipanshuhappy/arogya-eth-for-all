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

import lighthouse from '@lighthouse-web3/sdk';

import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { NFTStorage } from 'nft.storage';
import useGetTokenAddress from 'src/hooks/useGetTokenAddress';
import useToastCustom from 'src/hooks/useToastCustom';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

import { SpinnerContext } from '@/providers/SpinnerProvider';
import { fileToBlob, getFileUrl, getMetaDataUrl } from '@/utils/converter';
import { useRouter } from 'next/router';
import { CarReader } from 'nft.storage/dist/src/lib/interface';
import { EMPTY_BYTES } from 'src/data';
import useDocument from 'src/hooks/useDocument';
import useLightHouse from 'src/hooks/useLightHouse';
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
  const [enableFile, setEnableFile] = useState(false);

  const [blob, setBlob] = useState<Blob>();
  const [cipherText, setCipherText] = useState('');

  const [fileRequestId, setFileRequestId] = useState<number>();
  const { tokenAddress } = useGetTokenAddress();
  const { data: signer } = useSigner();
  // const { config: getRequestIdConfig } = usePrepareContractWrite({
  //   address: tokenAddress as `0x${string}`,
  //   abi: TokenFactoryAbi,
  //   functionName: 'buyTokenId',
  //   args: [safeIntToBigNumber(document.id), medusa.keypair.pubkey.toEvm()],
  //   overrides: { value: BigNumber.from(0) },
  //   enabled: !enableFile,
  //   onSuccess(data) {},
  // });
  // const [downloadUrl, setDownloadUrl] = useState('');
  // console.log({ downloadUrl });
  // // const { data, writeAsync } = useContractWrite(getRequestIdConfig);
  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     const encryptedBytes = base64.decode(cipherText);
  //     const decryptContent = async () => {
  //       if (decryptions.length != 0) {
  //         const decryptedBytes = await medusa.decrypt(
  //           decryptions[decryptions.length - 1].ciphertext,
  //           encryptedBytes
  //         );
  //         const msg = new TextDecoder().decode(decryptedBytes);
  //         if (msg.startsWith('data:image')) {
  //           setDownloadUrl(window.URL.createObjectURL(new Blob([msg])));
  //         }
  //       }
  //     };
  //     decryptContent();
  //   }
  // }, [isSuccess]);
  const encryptionSignature = async () => {
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };
  const getFile = async () => {
    // await medusa.signForKeypair();
    // setEnableFile(true);
    // const respone = await fetch(document.fileUrl);
    // const newText = await respone.text();
    // setCipherText(newText);
    // await writeAsync?.();
    // console.log({ fileRequestId });
    const fileCID = document.fileUrl.split('/')[4];
    const { publicKey, signedMessage } = await encryptionSignature();
    const fileType = 'image/jpeg';
    const keyObject = await lighthouse.fetchEncryptionKey(
      fileCID,
      publicKey,
      signedMessage
    );
    const decrypted = await lighthouse.decryptFile(fileCID, keyObject.data.key);
    console.log(decrypted);
    window.open(URL.createObjectURL(decrypted), '_blank');
  };
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
            <Button colorScheme='teal' variant='solid' onClick={getFile}>
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
  const router = useRouter();
  const [fileEvent, setFileEvent] = useState<ChangeEvent<HTMLInputElement>>();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const { spinner, setSpinnerText, setSpinner } = useContext(SpinnerContext);
  useEffect(() => {
    if (!tokenAddress) {
      router.push('/');
    }
  }, []);
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
  const encryptionSignature = async () => {
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };
  const { config, refetch } = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'mint',
    args: [mintData?.dataDescription, mintData?.dataUrl],
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
  console.log({ mintContractData });
  const nftStorageClient = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API,
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintContractData?.hash,
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSpinnerText('Uploading image to ipfs using Filecoin');
  //     setSpinner(false);
  //     successToast('Document Uploaded !');
  //     location.reload();
  //   }
  // }, [isSuccess]);

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
      setSpinnerText('Uploading image to ipfs using Filecoin');

      successToast('Document Uploaded !');
      location.reload();
      setSpinner(false);
    }
  }, [isLoading]);
  const {
    isLoading: lighthouseLoading,
    signedMessage,
    signInLighthouse,
    publicKey,
  } = useLightHouse();
  console.log({ signedMessage });
  console.log({ publicKey });
  const onOpenModal = async () => {
    onOpen();
  };
  const onDoucmentSubmit = async () => {
    setSpinner(true);
    onClose();
    setSpinnerText('Preparing File Upload...., Chill it takes time');
    const { publicKey, signedMessage } = await encryptionSignature();
    console.log('This is the signed message>>', signedMessage);
    const fileMetaData = {
      name: `${doc_user.title} `,
      description: doc_user.title,
      image: new File(['none'], doc_user.file.name, {
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
    const metaDataStorageInfo = await nftStorageClient.store(fileMetaData);
    const fileDescriptionUrl = getMetaDataUrl(metaDataStorageInfo.ipnft);

    const response = await lighthouse.uploadEncrypted(
      //@ts-ignore
      fileEvent,
      publicKey,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API,
      signedMessage
    );

    const fileUrl = getFileUrl(response.data.Hash);
    // const { encryptedData, encryptedKey } = await medusa.encrypt(
    //   new Uint8Array([]),
    //   tokenAddress as string
    // );
    console.log({ fileUrl });

    setMintData({
      dataUrl: fileUrl,
      dataDescription: fileDescriptionUrl,
    });

    write?.();
    if (!write) {
      setSpinner(false);
      alert('Transaction Failed please click submit button again');
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
    setFileEvent(event);
    setDoc_user({
      ...doc_user,
      file: selectedFile,
    });
  }
  const { tokenIds, tokenData, docs, loading: docLoading } = useDocument();
  console.log({ tokenIds });
  console.log({ tokenData });
  console.log({ docs });
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
              {docs && docs[docs.length - 1] ? (
                <Document document={docs[docs.length - 1]} />
              ) : null}
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
            <ModalContent marginTop={'64'} >
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
            <Stack spacing={1} direction={{ base: 'column', md: 'row' }}>
              {/* <Document document={emptyDoc} /> */}

              {docs.map((doc) => {
                if (doc) {
                  return <Document document={doc} />;
                } else {
                  return <Spinner size={'xl'} color='blue' />;
                }
              })}
            </Stack>
          </Stack>
        </Card>
      </Box>
    </>
  );
}

export default UserRecords;
