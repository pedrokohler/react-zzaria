import React from 'react';
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';

import Title from 'components/title';
import { useAuth } from 'hooks';
import OrderInfoComplete from 'components/order-info-complete';

const CheckoutConfirmation = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <Title variant='h4'>Oi, {user.firstName}</Title>
        <Typography>Confere, por favor, se está tudo certo com o seu pedido antes de finalizar?</Typography>
      </Header>
      <OrderInfoComplete />
    </>

  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: ${({ theme }) => theme.spacing(3)}px;

  text-align: center;
`;

export default CheckoutConfirmation;
