import React, { lazy, Suspense, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

import { AuthContext } from 'contexts/auth';

const MainPage = lazy(() => import('pages/main'));
const LoginPage = lazy(() => import('pages/login'));

const App = ({ location }) => {
  const { user, checkedAuthState } = useContext(AuthContext);
  const message = user ? 'Usuário está logado' : 'Usuário não está logado';
  console.log(message, user);

  if (!checkedAuthState) {
    return <LinearProgress />;
  }

  if (user) {
    if (location.pathname === '/login') {
      return <Redirect to='/' />;
    }
  } else {
    if (location.pathname !== '/login') {
      return <Redirect to='/login' />;
    }
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;
