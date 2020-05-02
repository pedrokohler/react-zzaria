import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button as MaterialButton,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useAuth } from 'hooks';
import { singularOrPlural } from 'utils';
import { SIZE_PAGE, QUANTITY_PAGE } from 'routes';

const Footer = ({ location }) => {
  const { user } = useAuth();
  const { name, slices, flavours } = location.state;

  return (
    <FooterContainer>
      <Container>
        <Grid container>
          <OrderContainer>
            <Typography><b>{user.firstName} o seu pedido é:</b></Typography>
            <Typography>
              Pizza <b>{name.toUpperCase()}</b> - {' '}
              ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
              {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
            </Typography>
          </OrderContainer>
          <Grid item>
            <Button to={SIZE_PAGE}>Voltar</Button>
            <Button
              to={{
                pathname: QUANTITY_PAGE,
                state: {
                  ...location.state
                }
              }} color='primary'
            >Avançar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

Footer.propTypes = {
  location: PropTypes.object.isRequired
};

const FooterContainer = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(1)}px;
  width: 100%;
`;

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  flex-grow: 1;
`;

const Button = styled(MaterialButton).attrs({
  variant: 'contained',
  component: Link
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export default Footer;
