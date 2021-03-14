import React, { useEffect, useState } from 'react';

import { getWeb3 } from './utils/web3';
import { Home } from './pages/Home';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async (): Promise<any> => {
    // https://stackoverflow.com/a/60282174 enable metamask
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    console.log(account)
    setCurrentAccount(account);
  }

  if (!currentAccount) {
    return <span>Loading Web3</span>
  }

  return (
    <>
      <Home />
    </>
  );

}
