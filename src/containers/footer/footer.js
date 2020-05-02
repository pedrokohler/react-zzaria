import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import {
  Button as MaterialButton,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useAuth, usePizza } from 'hooks';
import { singularOrPlural } from 'utils';
import { SIZE_PAGE } from 'routes';

const Footer = ({ nextPage, location, history }) => {
  const { pizza } = usePizza();
  const { user } = useAuth();

  if (!location.state) {
    return <Redirect to={SIZE_PAGE} />;
  }

  const { selectedSize, selectedFlavours } = location.state;
  const { name, slices, flavours } = selectedSize;

  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };

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
            {selectedFlavours && (
              <Typography>
                {singularOrPlural(selectedFlavours.length, 'No sabor', 'Nos sabores')}{' '}
                <b>{selectedFlavours
                  .map(({ name }) => name)
                  .join(', ')
                  .replace(/, (.[^,]*)$/, ' e $1')}
                </b>
              </Typography>
            )}
          </OrderContainer>
          <ButtonContainer>
            <Button onClick={goBack}>Voltar</Button>
            <Button
              component={Link}
              to={{
                pathname: nextPage,
                state: pizza
              }}
              color='primary'
              disabled={pizza.selectedFlavours ? pizza.selectedFlavours.length === 0 : false}
            >Avançar
            </Button>
          </ButtonContainer>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

Footer.propTypes = {
  nextPage: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ButtonContainer = styled(Grid).attrs({
  item: true
})`
  display: flex;
  align-items: center;
`;

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
  variant: 'contained'
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export default Footer;
