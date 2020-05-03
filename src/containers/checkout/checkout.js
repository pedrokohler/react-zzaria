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
import MyTitle from 'components/title';

const Checkout = () => (
  <Grid container spacing={4}>
    <Grid item xs={12} md={6}>
      <Title>Qual o endereço para entrega?</Title>
      <PaperContainer>
        <Grid container spacing={1}>
          <TextField label='CEP' sm={4} autoFocus />
          <Grid item sm={8} />
          <TextField label='Rua' sm={9} />
          <TextField label='Número' sm={3} />
          <TextField label='Complemento' sm={12} />
          <TextField label='Cidade' sm={9} />
          <TextField label='Estado' sm={3} />
        </Grid>
      </PaperContainer>

      <Title>Qual o seu telefone?</Title>
      <PaperContainer>
        <TextField label='Telefone' sm={4} />
      </PaperContainer>
    </Grid>

    <Grid container direction='column' item xs={12} md={6}>
      <Title>Informações do seu pedido</Title>
      <PaperContainer>
        <List>
          <ListItem>
            <Typography>
              <b>1</b> pizza <b>MÉDIA</b> (6 fatias, 2 sabores)
              <br />
              nos sabores <b>Calabresa e Frango com Catupiry</b>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              <b>1</b> pizza <b>MÉDIA</b> (6 fatias, 2 sabores)
              <br />
              nos sabores <b>Calabresa e Frango com Catupiry</b>
            </Typography>
          </ListItem>
        </List>
      </PaperContainer>
    </Grid>
  </Grid>
);

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
