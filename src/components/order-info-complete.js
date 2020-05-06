import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Divider as MaterialDivider,
  Paper,
  Typography
} from '@material-ui/core';

import { useOrder } from 'hooks';
import OrderInfo from 'components/order-info';

const OrderInfoComplete = () => {
  const { order } = useOrder();

  const {
    address: {
      address,
      city,
      state,
      number,
      complement,
      code
    },
    phone
  } = order;

  return (
    <Container maxWidth='sm'>
      <PaperContainer>
        <Typography variant='h6'>Seu pedido:</Typography>
        <OrderInfo />
        <Divider />
        <Typography variant='h6'>Endereço para entrega:</Typography>
        <Typography>
          {`${address}, ${number},`}
          <br />
          {complement}
          <br />
          {`CEP: ${code}`}
          <br />
          {`${city}/${state}`}
        </Typography>

        <Divider />
        <Typography variant='h6'>Telefone para contato:</Typography>
        <Typography>
          {phone}
        </Typography>
      </PaperContainer>
    </Container>
  );
};

const Divider = styled(MaterialDivider)`
  margin: ${({ theme }) => theme.spacing(3, 0)};
`;

const PaperContainer = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

export default OrderInfoComplete;
