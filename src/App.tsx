import React, { useEffect, useState } from 'react';

import { getWeb3 } from './utils/web3';
import AirlineContract from './contracts/airline';

import { Home } from './pages/Home';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [airlineContract, setAirlineContract] = useState<{[key: string]: any}>(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async (): Promise<any> => {
    // https://stackoverflow.com/a/60282174 enable metamask
    window.web3 = await getWeb3();
    const account = (await window.web3.eth.getAccounts())[0];
    const airlineContract = await AirlineContract(window.web3.currentProvider);
    setAirlineContract(airlineContract);
    setCurrentAccount(account);
  }

  if (!currentAccount) {
    return <span>Loading Web3</span>
  }

  return (
    <>
      <Home
        currentAccount={currentAccount}
        airlineContract={airlineContract}
      />
    </>
  );

}
