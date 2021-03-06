import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core';

import AuthProvider from 'contexts/auth';

import App from 'App';
import OrderProvider from 'contexts/order';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const Root = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <OrderProvider>
              <CssBaseline />
              <GlobalStyle />
              <BrowserRouter>
                <Route component={App} />
              </BrowserRouter>
            </OrderProvider>
          </AuthProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export default Root;
