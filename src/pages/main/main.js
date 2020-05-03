import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {
  LinearProgress
} from '@material-ui/core';
import { SIZE_PAGE, FLAVOURS_PAGE, QUANTITY_PAGE, CHECKOUT_PAGE } from 'routes';

import Header from 'containers/header';
import Footer from 'containers/footer';
import { usePizza, useOrder } from 'hooks';

const ChoosePizzaSize = lazy(() => import('containers/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('containers/choose-pizza-flavour'));
const ChoosePizzaQuantity = lazy(() => import('containers/choose-pizza-quantity'));
const Checkout = lazy(() => import('containers/checkout'));

const Main = () => {
  const { pizza, resetPizza } = usePizza();
  const { addPizzaToOrder } = useOrder();

  const addPizza = () => {
    addPizzaToOrder(pizza);
    resetPizza();
  };

  return (
    <>
      <Switch>
        <Route path={CHECKOUT_PAGE} render={() => <Header hideMenu disableLink />} />
        <Route component={Header} />
      </Switch>

      <Content>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={SIZE_PAGE} exact component={ChoosePizzaSize} />
            <Route path={FLAVOURS_PAGE} component={ChoosePizzaFlavour} />
            <Route
              path={QUANTITY_PAGE} render={({ location }) => {
                return <ChoosePizzaQuantity location={location} handleButtonClick={addPizza} />;
              }}
            />
            <Route path={CHECKOUT_PAGE} component={Checkout} />
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
              forwardButton={{
                to: {
                  pathname: QUANTITY_PAGE,
                  state: pizza
                },
                disabled: pizza.selectedFlavours.length === 0,
                component: Link,
                children: 'Avançar'
              }}
            />
          )}
        />
        <Route
          path={QUANTITY_PAGE}
          render={({ location, history }) => (
            <Footer
              location={location}
              history={history}
              forwardButton={{
                to: CHECKOUT_PAGE,
                component: Link,
                onClick: addPizza,
                children: 'Finalizar compra'
              }}
            />
          )}
        />
      </Switch>
    </>
  );
};

const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(12, 2, 2)};
  flex-grow: 1;
`;

export default Main;
