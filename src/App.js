import React, { lazy, Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import { AuthContext } from 'contexts/auth';

const MainPage = lazy(() => import('pages/main'));
const LoginPage = lazy(() => import('pages/login'));

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
