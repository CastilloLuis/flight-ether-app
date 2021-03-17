import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 50px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 15px;
  background-color: #023e8a;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 30px;
    color: white;
  }
`;

export const BoldText = styled.span`
  font-weight: 500;
  span {font-weight: 300;}
`;

export const AvailableFlights = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${props => props.col && 'flex-direction: column;'}
`;

export const FlightContent = styled.div`
  width: 100%;
  border: 1px solid #023e8a;
  border-radius: 10px;
  margin: 15px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const BuyButton = styled.button`
  border: 1px solid #023e8a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 25px;
  border-radius: 10px;
  color: #000;
  background: #fff;
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: #023e8a;
    color: #fff;
  }
`;

export const RefundButton = styled(BuyButton)`
  background: #023e8a;
  color: #fff;
  &:hover {
    color: #000;
    background: #fff;
  }
`