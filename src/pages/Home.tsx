import React from 'react';
import { HomeContainer } from './Home.styles';

interface HomeProps {};

export const Home: React.FC<HomeProps> = () => {
  return (
    <HomeContainer>
      <span>Home Container!</span>
    </HomeContainer>
  )
}
