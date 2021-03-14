import React from 'react';
import { BoxContainer, BoxHeader, BoxContent } from './Box.styles';

interface BoxProps {
  title: string;
  children: any;
}

export const Box: React.FC<BoxProps> = ({title, children}) => {
  return (
    <BoxContainer>
        <BoxHeader><span>{title}</span></BoxHeader>
        <BoxContent>{children}</BoxContent>
    </BoxContainer>
  );
};
