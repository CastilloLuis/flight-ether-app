import React, { useEffect, useState } from 'react';
import { transformWeiToEther } from '../utils/web3';

import { Box } from '../components/Box/Box';
import { BoldText, Header, HomeContainer } from './Home.styles';

interface HomeProps {
  currentAccount: string;
  airlineContract: {[key: string]: any};
};

export const Home: React.FC<HomeProps> = ({
  currentAccount, airlineContract
}) => {

  const [currentBalance, setCurrentBalance] = useState<string>('0');

  useEffect(() => {
    if (!currentAccount) return;
    getBalance();
  }, [currentAccount]);


  const getBalance = async () => {
    const weiBalance = await window.web3.eth.getBalance(currentAccount);
    setCurrentBalance(weiBalance);
  }

  return (
    <HomeContainer>
      <Header><span>Flight Ether App</span></Header>
      <Box title="📊 Balance 📊">
        <div><BoldText>Account: <span>{currentAccount}</span></BoldText></div>
        <div><BoldText>ETH: <span>{transformWeiToEther(currentBalance)}</span></BoldText></div>
      </Box>
    </HomeContainer>
  );

}

