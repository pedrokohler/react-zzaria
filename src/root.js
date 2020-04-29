import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core';

import AuthProvider from 'contexts/auth';

import App from 'app';

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
            <CssBaseline />

            <BrowserRouter>
              <Route component={App} />
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

export default Root;
