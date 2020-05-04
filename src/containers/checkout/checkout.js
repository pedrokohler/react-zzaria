import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  TextField as MaterialTextField
} from '@material-ui/core';

import MyTitle from 'components/title';
import OrderInfo from 'components/order-info';

const Checkout = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Title>Qual o endereço para entrega?</Title>
        <AddressPaperContainer>
          <Grid container spacing={1}>
            <TextField label='CEP' sm={5} autoFocus />
            <Grid item sm={7} />
            <TextField label='Rua' sm={9} />
            <TextField label='Número' sm={3} />
            <TextField label='Complemento' sm={12} />
            <TextField label='Cidade' sm={9} />
            <TextField label='Estado' sm={3} />
          </Grid>
        </AddressPaperContainer>

        <Title>Qual o seu telefone?</Title>
        <PaperContainer>
          <TextField label='Telefone' sm={5} />
        </PaperContainer>
      </Grid>

      <Grid container direction='column' item xs={12} md={6}>
        <Title>Informações do seu pedido</Title>
        <PaperContainer>
          <OrderInfo />
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

const TextField = ({ sm, xs, autoFocus, ...props }) => (
  <Grid item xs={12} sm={sm}>
    <MaterialTextField
      fullWidth
      variant='outlined'
      inputProps={{ autoFocus }}
      {...props}
    />
  </Grid>
);

TextField.propTypes = {
  autoFocus: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number
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
