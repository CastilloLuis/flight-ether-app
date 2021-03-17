import React, { useEffect } from 'react';
import { ToastrContainer } from './Toastr.styles';

interface ToastrProps {
  message: string;
}

export const Toastr: React.FC<ToastrProps> = ({ message }) => {
  return (
    <ToastrContainer>
      <span>{message}</span>
    </ToastrContainer>
  )
} 