import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

import PizzaProvider from 'contexts/pizza';
import { useAuth } from 'hooks';
import { SIZE_PAGE, LOGIN_PAGE } from 'routes';

const MainPage = lazy(() => import('pages/main'));
const LoginPage = lazy(() => import('pages/login'));

const App = ({ location }) => {
  const { user, checkedAuthState } = useAuth();

  if (!checkedAuthState) {
    return <LinearProgress />;
  }

  if (user && location.pathname === LOGIN_PAGE) {
    return <Redirect to={SIZE_PAGE} />;
  }

  if (!user && location.pathname !== LOGIN_PAGE) {
    return <Redirect to={LOGIN_PAGE} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <PizzaProvider location={location}>
        <Switch>
          <Route path={LOGIN_PAGE} component={LoginPage} />
          <Route component={MainPage} />
        </Switch>
      </PizzaProvider>
    </Suspense>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;
