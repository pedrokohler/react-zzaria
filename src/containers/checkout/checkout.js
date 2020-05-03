import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  Paper,
  TextField as MaterialTextField,
  Typography
} from '@material-ui/core';

import { useOrder } from 'hooks';
import MyTitle from 'components/title';
import { singularOrPlural } from 'utils';

const Checkout = () => {
  const { order } = useOrder();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Title>Qual o endereço para entrega?</Title>
        <PaperContainer>
          <Grid container spacing={1}>
            <TextField label='CEP' sm={5} autoFocus />
            <Grid item sm={7} />
            <TextField label='Rua' sm={9} />
            <TextField label='Número' sm={3} />
            <TextField label='Complemento' sm={12} />
            <TextField label='Cidade' sm={9} />
            <TextField label='Estado' sm={3} />
          </Grid>
        </PaperContainer>

        <Title>Qual o seu telefone?</Title>
        <PaperContainer>
          <TextField label='Telefone' sm={5} />
        </PaperContainer>
      </Grid>

      <Grid container direction='column' item xs={12} md={6}>
        <Title>Informações do seu pedido</Title>
        <PaperContainer>
          <List>
            {order.pizzas.map((pizza, i) => {
              const { size, flavours: selectedFlavours, quantity } = pizza;
              const { name, slices, flavours } = size;
              return (
                <ListItem key={i}>
                  <Typography>
                    <b>{quantity}</b> - {singularOrPlural(quantity, 'pizza', 'pizzas')}{' '}
                    <b>{name.toUpperCase()}</b> - {' '}
                    ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
                    {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
                    <br />
                    {singularOrPlural(selectedFlavours.length, 'No sabor', 'Nos sabores')}{' '}
                    <b>{selectedFlavours
                      .map(({ name }) => name)
                      .join(', ')
                      .replace(/, (.[^,]*)$/, ' e $1')}
                    </b>
                  </Typography>
                </ListItem>
              );
            })}
          </List>
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
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

export default Checkout;
