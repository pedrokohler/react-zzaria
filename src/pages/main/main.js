import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {
  Button,
  Container,
  LinearProgress
} from '@material-ui/core';
import { SIZE_PAGE, FLAVOURS_PAGE, QUANTITY_PAGE, CHECKOUT_PAGE, CHECKOUT_CONFIRMATION_PAGE } from 'routes';

import Header from 'containers/header';
import Footer from 'containers/footer';
import FooterCheckout from 'containers/footer/footer-checkout';
import { usePizza, useOrder } from 'hooks';

const ChoosePizzaSize = lazy(() => import('containers/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('containers/choose-pizza-flavour'));
const ChoosePizzaQuantity = lazy(() => import('containers/choose-pizza-quantity'));
const Checkout = lazy(() => import('containers/checkout'));
const CheckoutConfirmation = lazy(() => import('containers/checkout-confirmation'));

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
              path={QUANTITY_PAGE}
              render={({ location }) => {
                return <ChoosePizzaQuantity location={location} handleButtonClick={addPizza} />;
              }}
            />
            <Route exact path={CHECKOUT_PAGE} component={Checkout} />
            <Route path={CHECKOUT_CONFIRMATION_PAGE} component={CheckoutConfirmation} />
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
        <Route
          exact
          path={CHECKOUT_PAGE} render={() => (
            <FooterCheckout>
              <ButtonLink to={CHECKOUT_CONFIRMATION_PAGE}>
                <Button variant='contained' color='primary'>Confirmar dados</Button>
              </ButtonLink>
            </FooterCheckout>
          )}
        />
        <Route
          exact
          path={CHECKOUT_CONFIRMATION_PAGE} render={() => (
            <FooterCheckout justifyContent='center'>
              <ButtonLink to='' size='large'>
                <Button variant='contained' color='primary'>Tudo certo!</Button>
              </ButtonLink>
            </FooterCheckout>
          )}
        />
      </Switch>
    </>
  );
};

const ButtonLink = styled(Link)`
    text-decoration: inherit;
    color: inherit;
`;

const ContentWrapper = styled.main`
  padding: ${({ theme }) => theme.spacing(12, 2, 2)};
  flex-grow: 1;
`;

const Content = ({ children, ...props }) => (
  <ContentWrapper {...props}>
    <Container>
      {children}
    </Container>
  </ContentWrapper>
);

Content.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
