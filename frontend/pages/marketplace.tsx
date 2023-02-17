import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
// import {CUIAutoComplete} from '@chakra-ui/pin-input';
function index() {
  return (
    <>
      <Heading textAlign={'center'} marginTop={'40'}>
        Welcome to the MarketPlace
      </Heading>

      <Stack spacing={4} marginTop={'28'} marginLeft={'10'} marginRight={'10'}>
        <InputGroup>
          <InputLeftElement
            // pointerEvents='none'
            color='gray.300'
            // fontSize='7xl'
          />
          <Input
            type='search'
            placeholder='Search Here'
            paddingBlock={'10'}
            size={'lg'}
          />
          <InputRightElement
            children={
              <Search2Icon
                marginRight={'10'}
                boxSize={'10'}
                color='green.500'
              />
            }
            paddingBlock={'10'}
          />
        </InputGroup>
      </Stack>

      <Box marginLeft={'10'} marginRight={'10'} marginTop={'20'}>
        <Wrap margin={'10'} spacing={10}>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card bgColor={'grey.900'} boxShadow={'lg'} padding={4}>
              <VStack spacing={4} align={'start'}>
                <Text>Nithin Varma Mengani</Text>
                <Text>Uploaded Date: {'date here'}</Text>
                <Button>Open File</Button>
              </VStack>
            </Card>
          </WrapItem>
        </Wrap>
      </Box>
    </>
  );
}

export default index;
