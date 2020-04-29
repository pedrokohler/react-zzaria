import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { HOME_PAGE, FLAVOURS_PAGE } from 'routes';

import Header from 'components/header';

const ChoosePizzaSize = lazy(() => import('components/choose-pizza-size'));
const ChoosePizzaFlavour = lazy(() => import('components/choose-pizza-flavour'));

const Main = () => (
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
  </>
);

const Content = styled.main`
  padding: 100px 20px 20px;
`;

export default Main;
