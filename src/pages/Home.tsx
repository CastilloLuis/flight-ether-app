import React, { useEffect, useState } from 'react';
import { transformWeiToEther } from '../utils/web3';

import { Flight } from '../shared/entities';
import { Box } from '../components/Box/Box';
import { AvailableFlights, BoldText, BuyButton, FlightContent, Header, HomeContainer } from './Home.styles';
import { getFlights, buyFlight } from '../services/contractActions';

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

  const onBuyFlight = async (flight: Flight, idx: number) : Promise<void> => {
    await buyFlight(idx, currentAccount, flight.price);
  }

  return (
    <HomeContainer>
      <Header><span>Flight Ether App</span></Header>
      <Box title="📊  Balance 📊">
        <div><BoldText>Account: <span>{currentAccount}</span></BoldText></div>
        <div><BoldText>ETH: <span>{transformWeiToEther(currentBalance)}</span></BoldText></div>
      </Box>
      <Box title="🛩  Flights 🛩">
        <AvailableFlights>
          {
            availableFlights?.map((flight, idx) => (
              <FlightContent key={'flight' + idx}>
                <BoldText>🛫 Route: <span>{flight?.route}</span> <br></br> 💲 Price (ETH): <span>{transformWeiToEther(flight?.price?.toString())}</span></BoldText>
                <BuyButton type="button" onClick={() => onBuyFlight(flight, idx)}>Purchase</BuyButton>
              </FlightContent>
            ))
          }
        </AvailableFlights>
      </Box>
    </HomeContainer>
  );

}

