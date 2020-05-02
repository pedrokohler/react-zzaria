import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  LinearProgress
} from '@material-ui/core';
import { SIZE_PAGE, FLAVOURS_PAGE, QUANTITY_PAGE, CHECKOUT_PAGE } from 'routes';

import Header from 'containers/header';
import Footer from 'containers/footer';

const ChoosePizzaSize = lazy(() => import('containers/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('containers/choose-pizza-flavour'));
const ChoosePizzaQuantity = lazy(() => import('containers/choose-pizza-quantity'));

const Main = () => (
  <>
    <Header />

    <Content>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path={SIZE_PAGE} exact component={ChoosePizzaSize} />
          <Route path={FLAVOURS_PAGE} component={ChoosePizzaFlavour} />
          <Route path={QUANTITY_PAGE} component={ChoosePizzaQuantity} />
          <Redirect to={SIZE_PAGE} />
        </Switch>
      </Suspense>
    </Content>

    <Switch>
      <Route
        path={FLAVOURS_PAGE}
        render={({ location, history }) => (
          <Footer
            location={location}
            history={history}
            nextPage={QUANTITY_PAGE}
          />)}
      />
      <Route
        path={QUANTITY_PAGE}
        render={({ location, history }) => (
          <Footer
            location={location}
            history={history}
            nextPage={CHECKOUT_PAGE}
          />)}
      />
    </Switch>
  </>
);

const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(12, 2, 2)};
  flex-grow: 1;
`;

export default Main;
