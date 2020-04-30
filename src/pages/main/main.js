import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress, Container, Grid, Typography } from '@material-ui/core';
import { HOME_PAGE, FLAVOURS_PAGE } from 'routes';

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
            <Route path={HOME_PAGE} exact component={ChoosePizzaSize} />
            <Route path={FLAVOURS_PAGE} component={ChoosePizzaFlavour} />
          </Switch>
        </Suspense>
      </Content>

      {location.pathname !== HOME_PAGE && (
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
                Botões
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
