import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/main';
import LoginPage from './pages/login';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Route component={MainPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
