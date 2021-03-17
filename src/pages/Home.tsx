import React, { useEffect, useState } from 'react';
import { transformWeiToEther } from '../utils/web3';

import { Flight } from '../shared/entities';
import { Box } from '../components/Box/Box';
import { AvailableFlights, BoldText, BuyButton, FlightContent, Header, HomeContainer, RefundButton } from './Home.styles';
import {
  getFlights,
  buyFlight,
  getAccountFlights as getCurrentAccountFlights,
  getRefundableEther,
  redeemLoyaltyPoints,
} from '../services/contractActions';

// https://awantoch.medium.com/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a

interface HomeProps {
  currentAccount: string;
};

export const Home: React.FC<HomeProps> = ({
  currentAccount
}) => {

  const [currentBalance, setCurrentBalance] = useState<string>('0');
  const [currentRefundableEther, setCurrentRefundableEther] = useState<string>(null);
  const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);
  const [accountFlights, setAccountFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!window?.contracts?.airline) return;
    getAirlinesFlights();
    getAccountFlights();
  }, [window?.contracts])

  useEffect(() => {
    if (!currentAccount) return;
    getBalance();
    getAccountFlights();
    getRefundableAccountEther();
  }, [currentAccount]);

  const getBalance = async (): Promise<any>  => {
    const weiBalance = await window.web3.eth.getBalance(currentAccount);
    setCurrentBalance(weiBalance);
  }

  const getAirlinesFlights = async (): Promise<void> => {
    const flights: Flight[] = await getFlights();
    setAvailableFlights(flights);
  }

  const getAccountFlights = async (): Promise<void> => {
    const flights: Flight[] = await getCurrentAccountFlights(currentAccount);
    setAccountFlights(flights);
  }

  const getRefundableAccountEther = async (): Promise<void> => {
    const ether = await getRefundableEther(currentAccount);
    setCurrentRefundableEther(transformWeiToEther(ether.toString()));
  }

  const onBuyFlight = async (flight: Flight, idx: number) : Promise<void> => {
    await buyFlight(idx, currentAccount, flight.price);
  }

  const onRefundEther = async (): Promise<void> => {
    await redeemLoyaltyPoints(currentAccount);
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
                <BuyButton
                  type="button"
                  onClick={() => onBuyFlight(flight, idx)}
                >
                  Purchase
                </BuyButton>
              </FlightContent>
            ))
          }
        </AvailableFlights>
      </Box>
      <Box title="🛩  My Flights 🛩">
        <AvailableFlights col>
          {accountFlights?.length === 0 && (<span>You don't have any flights</span>)}
          {
            accountFlights?.map((flight, idx) => (
              <FlightContent key={'flight' + idx}>
                <BoldText>🛫 Route: <span>{flight?.route}</span> <br></br> 💲 Price (ETH): <span>{transformWeiToEther(flight?.price?.toString())}</span></BoldText>
              </FlightContent>
            ))
          }
        </AvailableFlights>
      </Box>
      <Box title="👑 Loyalty Points - Refundable Ether 👑">
        <AvailableFlights col>
          <span>{currentRefundableEther} eth</span>
          <RefundButton 
            type="button"
            onClick={() => onRefundEther()}
          >
            Generate Refund
          </RefundButton>
        </AvailableFlights>
      </Box>
    </HomeContainer>
  );

}

