import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

type TokenAddressContextType = {
  tokenAddress: string;
  setTokenAddress: Dispatch<(prevState: undefined | string) => undefined>;
};

export const TokenAddressContext = createContext<TokenAddressContextType>({
  tokenAddress: '',
  setTokenAddress: () => {},
});

const TokenAddressProvider = ({ children }: PropsWithChildren<{}>) => {
  const [tokenAddress, setTokenAddress] = useState<string>();
  const value = useMemo<TokenAddressContextType>(
    () => ({ tokenAddress, setTokenAddress }),
    [tokenAddress]
  );

  return (
    <TokenAddressContext.Provider value={value}>
      {children}
    </TokenAddressContext.Provider>
  );
};

export default TokenAddressProvider;
