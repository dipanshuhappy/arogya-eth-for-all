import PageLayout from '@/components/page-layout';
import UserProfile from '@/components/User_Record-Page/UserProfile';
import { Doc_User, TokenAccessDetail, User } from '@/types/user';
import {
  getCidFromFileUrl,
  getViewUrlFromCid,
  safeIntToBigNumber,
} from '@/utils/converter';
import {
  deserialiseTokenAccessDetail,
  deserialiseUser,
} from '@/utils/deserialise';
import { encryptionSignatureForLighthouse } from '@/utils/fetcher';
import { DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import lighthouse from '@lighthouse-web3/sdk';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoCopySharp } from 'react-icons/io5';
import { TokenFactoryAbi } from 'src/abi';
import { useContractRead } from 'wagmi';

function Document({ document }: { document: Doc_User }) {
  const { hasCopied, onCopy, setValue, value } = useClipboard('');
  const router = useRouter();
  const [tokenAccessDetail, setTokenAccessDetail] =
    useState<TokenAccessDetail>();
  const { tokenAddress } = router.query;
  const { data: accessDetailData } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'id_TokenAccessDetailMapping',
    args: [safeIntToBigNumber(document.id)],
    watch: true,
  });
  useEffect(() => {
    if (accessDetailData) {
      console.log('Token access detail data', { accessDetailData });
      const tokenDetailWithoutAddresses =
        deserialiseTokenAccessDetail(accessDetailData);
      setTokenAccessDetail({
        allowedAddresses: [],
        is_public: tokenDetailWithoutAddresses.is_public,
        price: tokenDetailWithoutAddresses.price,
      });
    }
  }, [accessDetailData]);
  const onClipBoardClick = () => {
    setValue(getViewUrlFromCid(getCidFromFileUrl(document.fileUrl)));
    onCopy();
    onCopy();
  };
  const onDownload = async () => {
    const fileCID = getCidFromFileUrl(document.fileUrl);
    const { publicKey, signedMessage } =
      await encryptionSignatureForLighthouse();
    const fileType = 'image/jpeg';
    const keyObject = await lighthouse.fetchEncryptionKey(
      fileCID,
      publicKey,
      signedMessage
    );
    const decrypted = await lighthouse.decryptFile(fileCID, keyObject.data.key);

    const aElement = window.document.createElement('a');
    aElement.setAttribute('download', `${document.title}.PNG`);
    const href = URL.createObjectURL(decrypted);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
  };
  const getFile = async () => {
    const fileCID = getCidFromFileUrl(document.fileUrl);
    const { publicKey, signedMessage } =
      await encryptionSignatureForLighthouse();
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
          <HStack width={'100%'} justifyContent='space-between'>
            <Heading textAlign={'start'}>{document?.title}</Heading>
            <VStack spacing={4} position='absolute' right={'3%'} top='3%'>
              <IconButton
                aria-label='downlaod button'
                colorScheme={'c'}
                variant='ghost'
                backgroundColor={'brand.500'}
                icon={<DownloadIcon />}
                onClick={onDownload}
                borderRadius='3xl'
              />
              <IconButton
                aria-label='share button'
                colorScheme={'whatsapp'}
                variant='solid'
                icon={<IoCopySharp />}
                onClick={onClipBoardClick}
                borderRadius='3xl'
              />
            </VStack>
          </HStack>
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
            {tokenAccessDetail && (
              <>
                {' '}
                <Text
                  textAlign={'center'}
                  color='black'
                  fontSize='large'
                  width='100%'
                >
                  'This file is Public '
                </Text>
                {/* <Text textAlign={'center'} fontSize='medium' width='100%'>
                  {tokenAccessDetail?.price !== 0
                    ? `This file is set at price ${tokenAccessDetail.price} `
                    : null}
                </Text> */}
              </>
            )}
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

const User = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const { tokenAddress } = router.query;
  const { data } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: TokenFactoryAbi,
    functionName: 'getOwnerDetails',
  });

  useEffect(() => {
    if (data) {
      setUser(deserialiseUser(data));
    }
  }, [data]);

  return (
    <PageLayout title='User profile'>
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
                {/* {docs ? (
                docs[docs.length - 1] ? (
                  <Document document={docs[docs.length - 1]} />
                ) : null
              ) : (
                <Spinner size={'xl'} color='blue' />
              )} */}
              </VStack>
            </Stack>
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
              <Stack spacing={1} direction={'row'}>
                {/* <Document document={emptyDoc} /> */}
                {/* {docs ? (
                docs.map((doc) => <Document document={doc} />)
              ) : (
                <Spinner size={'xl'} color='blue' />
              )} */}
              </Stack>
            </Stack>
          </Card>
        </Box>
      </>
    </PageLayout>
  );
};
export default User;
