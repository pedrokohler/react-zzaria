import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { AuthContext } from 'contexts/auth';

const routes = [
  { path: '/rota1', content: 'Rota 1' },
  { path: '/rota2', content: 'Rota 2' }
];

const Main = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <>
      <h1>Main</h1>
      <Button onClick={handleLogout} variant='contained'>Sair</Button>
      <Switch>
        {routes.map(
          route =>
            <Route
              key={route.path}
              path={route.path}
              render={() => <h2>{route.content}</h2>}
            />
        )}
      </Switch>
    </>
  );
};

export default Main;
