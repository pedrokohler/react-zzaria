import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Paper
} from '@material-ui/core';

import FormAddress from './form-address';
import PhoneField from './phone-field';
import MyTitle from 'components/title';
import OrderInfo from 'components/order-info';

const Checkout = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Title>Qual o endereço para entrega?</Title>
        <AddressPaperContainer>
          <FormAddress />
        </AddressPaperContainer>

        <Title>Qual o seu telefone?</Title>
        <PaperContainer>
          <PhoneField />
        </PaperContainer>
      </Grid>

      <Grid container direction='column' item xs={12} md={6}>
        <Title>Informações do seu pedido</Title>
        <PaperContainer>
          <OrderInfo showRemoveButton />
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

const Title = styled(MyTitle).attrs({
  variant: 'h6'
})`
  text-align: left;
`;

const PaperContainer = styled(Paper)`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const AddressPaperContainer = styled(PaperContainer)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export default Checkout;
