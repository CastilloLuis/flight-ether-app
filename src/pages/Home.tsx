import React, { useEffect, useState } from 'react';
import { transformWeiToEther } from '../utils/web3';

import { Box } from '../components/Box/Box';
import { BoldText, Header, HomeContainer } from './Home.styles';
import { getFlights } from '../services/contractActions';
import { Flight } from '../shared/entities';

interface HomeProps {
  currentAccount: string;
};

export const Home: React.FC<HomeProps> = ({
  currentAccount
}) => {

  const [currentBalance, setCurrentBalance] = useState<string>('0');
  const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!window?.contracts?.airline) return;
    getAirlinesFlights();
  }, [window?.contracts])

  useEffect(() => {
    if (!currentAccount) return;
    getBalance();
  }, [currentAccount]);

  const getBalance = async (): Promise<any>  => {
    const weiBalance = await window.web3.eth.getBalance(currentAccount);
    setCurrentBalance(weiBalance);
  }

  const getAirlinesFlights = async (): Promise<void> => {
    const flights: Flight[] = await getFlights();
    setAvailableFlights(flights);
  }

  return (
    <HomeContainer>
      <Header><span>Flight Ether App</span></Header>
      <Box title="📊  Balance 📊">
        <div><BoldText>Account: <span>{currentAccount}</span></BoldText></div>
        <div><BoldText>ETH: <span>{transformWeiToEther(currentBalance)}</span></BoldText></div>
      </Box>
      <Box title="🛩  Flights 🛩">
          {
            availableFlights?.map((flight, idx) => (
              <div>
                <BoldText key={'flight' + idx}>🛫 Route: <span>{flight?.route}</span> - 💲 Price (ETH): <span>{transformWeiToEther(flight?.price?.toString())}</span></BoldText>
              </div>
            ))
          }
      </Box>
    </HomeContainer>
  );

}

