import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import {
  Button as MaterialButton,
  Container,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { SIZE_PAGE, FLAVOURS_PAGE, QUANTITY_PAGE } from 'routes';

import Header from 'containers/header';
import { useAuth } from 'hooks';
import { singularOrPlural } from 'utils';

const ChoosePizzaSize = lazy(() => import('containers/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('containers/choose-pizza-flavour'));

const Main = ({ location }) => {
  const { user } = useAuth();
  let name, slices, flavours;
  if (location.state) {
    ({ name, slices, flavours } = location.state);
  }

  return (
    <>
      <Header />

      <Content>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={SIZE_PAGE} exact component={ChoosePizzaSize} />
            <Route path={FLAVOURS_PAGE} component={ChoosePizzaFlavour} />
            <Redirect to={SIZE_PAGE} />
          </Switch>
        </Suspense>
      </Content>

      {location.state && (
        <Footer>
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
                <Button to={QUANTITY_PAGE} color='primary'>Avançar</Button>
              </Grid>
            </Grid>
          </Container>
        </Footer>
      )}
    </>
  );
};

Main.propTypes = {
  location: PropTypes.object.isRequired
};

const Button = styled(MaterialButton).attrs({
  variant: 'contained',
  component: Link
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  flex-grow: 1;
`;

const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(12, 2, 2)};
  flex-grow: 1;
`;

const Footer = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(1)}px;
  width: 100%;
`;

export default Main;
