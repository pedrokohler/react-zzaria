import React, { lazy, Suspense, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {
  Button,
  Container,
  LinearProgress
} from '@material-ui/core';
import {
  SIZE_PAGE,
  FLAVOURS_PAGE,
  QUANTITY_PAGE,
  CHECKOUT_PAGE,
  CHECKOUT_CONFIRMATION_PAGE,
  CHECKOUT_SUCCESS_PAGE
} from 'routes';

import Header from 'containers/header';
import Footer from 'containers/footer';
import FooterCheckout from 'containers/footer/footer-checkout';
import { usePizza, useOrder } from 'hooks';

const ChoosePizzaSize = lazy(() => import('containers/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('containers/choose-pizza-flavour'));
const ChoosePizzaQuantity = lazy(() => import('containers/choose-pizza-quantity'));
const Checkout = lazy(() => import('containers/checkout'));
const CheckoutConfirmation = lazy(() => import('containers/checkout-confirmation'));
const CheckoutSuccess = lazy(() => import('containers/checkout-success'));

const Main = () => {
  const { pizza, resetPizza } = usePizza();
  const { addPizzaToOrder, sendOrder } = useOrder();

  const _addPizza = useCallback(() => {
    addPizzaToOrder(pizza);
    resetPizza();
  }, [addPizzaToOrder, pizza, resetPizza]);

  const _renderQuantityPage = useCallback(({ location }) => {
    return <ChoosePizzaQuantity location={location} handleButtonClick={_addPizza} />;
  }, [_addPizza]);

  const _renderFlavoursPageFooter = useCallback(({ location, history }) => (
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
  ), [pizza]);

  const _renderQuantityPageFooter = useCallback(({ location, history }) => (
    <Footer
      location={location}
      history={history}
      forwardButton={{
        to: CHECKOUT_PAGE,
        component: Link,
        onClick: _addPizza,
        children: 'Finalizar compra'
      }}
    />
  ), [_addPizza]);

  const _renderCheckoutPageFooter = useCallback(() => (
    <FooterCheckout>
      <ButtonLink to={CHECKOUT_CONFIRMATION_PAGE}>
        <Button variant='contained' color='primary'>Confirmar dados</Button>
      </ButtonLink>
    </FooterCheckout>
  ), []);

  const _renderCheckoutConfirmationFooter = useCallback(() => (
    <FooterCheckout justifyContent='center'>
      <ButtonLink to={CHECKOUT_SUCCESS_PAGE}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={sendOrder}
        >
          Tudo certo!
        </Button>
      </ButtonLink>
    </FooterCheckout>
  ), [sendOrder]);

  const _renderCheckoutSuccessFooter = useCallback(() => (
    <FooterCheckout justifyContent='center'>
      <ButtonLink to={SIZE_PAGE}>
        <Button size='large' color='secondary'>
          {' < '} Voltar para a página inicial
        </Button>
      </ButtonLink>
    </FooterCheckout>
  ), []);

  const commonPropTypes = useCallback({
    location: PropTypes.object,
    history: PropTypes.object
  }, []);

  _renderQuantityPage.propTypes = {
    location: PropTypes.object
  };
  _renderFlavoursPageFooter.propTypes = commonPropTypes;
  _renderQuantityPageFooter.propTypes = commonPropTypes;

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
            <Route path={QUANTITY_PAGE} render={_renderQuantityPage} />
            <Route exact path={CHECKOUT_PAGE} component={Checkout} />
            <Route path={CHECKOUT_CONFIRMATION_PAGE} component={CheckoutConfirmation} />
            <Route path={CHECKOUT_SUCCESS_PAGE} component={CheckoutSuccess} />
            <Redirect to={SIZE_PAGE} />
          </Switch>
        </Suspense>
      </Content>

      <Switch>
        <Route path={FLAVOURS_PAGE} render={_renderFlavoursPageFooter} />
        <Route path={QUANTITY_PAGE} render={_renderQuantityPageFooter} />
        <Route exact path={CHECKOUT_PAGE} render={_renderCheckoutPageFooter} />
        <Route exact path={CHECKOUT_CONFIRMATION_PAGE} render={_renderCheckoutConfirmationFooter} />
        <Route exact path={CHECKOUT_SUCCESS_PAGE} render={_renderCheckoutSuccessFooter} />
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
