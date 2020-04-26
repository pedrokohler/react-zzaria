import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import MainPage from 'pages/main';
import LoginPage from 'pages/login';

const App = () => (
  <>
    <CssBaseline />

    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route component={MainPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
