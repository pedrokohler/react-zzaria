import React from 'react';
import styled from 'styled-components';
import {
  Typography
} from '@material-ui/core';

import Title from 'components/title';
import { useAuth } from 'hooks';
import OrderInfoComplete from 'components/order-info-complete';

const CheckoutSuccess = () => {
  const { user } = useAuth();
  return (
    <>
      <Header>
        <Title variant='h4'>Prontinho, {user.firstName}</Title>
        <Typography>Seu pedido será entregue no endereço abaixo em até</Typography>
        <Typography variant='h6'>40 minutos</Typography>
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

export default CheckoutSuccess;
