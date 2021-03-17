import React, { useEffect, useState } from 'react';

import { getWeb3, transformWeiToEther } from './utils/web3';
import AirlineContract from './contracts/airline';

import { Home } from './pages/Home';
import { Toastr } from './components/Toastr/Toastr';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [airlineContract, setAirlineContract] = useState<{[key: string]: any}>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>(null);

  useEffect(() => {
    initWeb3();
    detectMetaMaskAccountChange();
  }, []);

  useEffect(() => {
    if (!airlineContract) return;
    window.contracts = {...window.contracts, airline: airlineContract};
  }, [airlineContract]);

  useEffect(() => {
    if (currentAccount && airlineContract) {
      detectFlightPurchased();
    }
  }, [currentAccount, airlineContract]);

  useEffect(() => {
    if (notificationMessage) {
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3000);
    }
  }, [notificationMessage]);

  const initWeb3 = async (): Promise<any> => {
    // https://stackoverflow.com/a/60282174 enable metamask
    window.web3 = await getWeb3();
    const account = (await window.web3.eth.getAccounts())[0];
    const airlineContract = await AirlineContract(window.web3.currentProvider);
    setAirlineContract(airlineContract);
    setCurrentAccount(account);
  }

  const detectFlightPurchased = async (): Promise<void> => {
    const flightPurchased = window.contracts.airline.FlightPurchased;
    flightPurchased({}, (error, result) => {
      const { returnValues: { customer, price, flight } } = result;
      if (customer !== currentAccount) {
        setNotificationMessage(`A customer just bought a flight to ${flight} with a cost of ${transformWeiToEther(price)} eth`);
      }
    });
  }

  const detectMetaMaskAccountChange = (): void => {
    window.ethereum.on('accountsChanged', async (event) => {
      const address = event[0];
      if (!address) return 'Connect with Meta Mask';
      setCurrentAccount(address);
    });
  }

  if (!currentAccount) {
    return <span>Loading Web3</span>
  }

  return (
    <>
      { notificationMessage && (<Toastr message={notificationMessage}/>) }
      <Home
        currentAccount={currentAccount}
      />
    </>
  );

}
