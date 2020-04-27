import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Grid } from '@material-ui/core';
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg';

const firebaseConfig = {
  apiKey: 'AIzaSyBb0gccAWocgyHl0ifFbz9AnzeEGXhATXo',
  authDomain: 'react-zzaria-7d8d5.firebaseapp.com',
  databaseURL: 'https://react-zzaria-7d8d5.firebaseio.com',
  projectId: 'react-zzaria-7d8d5',
  storageBucket: 'react-zzaria-7d8d5.appspot.com',
  messagingSenderId: '554976170245',
  appId: '1:554976170245:web:5883784a98ff75938a276c'
};

firebase.initializeApp(firebaseConfig);

const handleLogout = () => {
  firebase.auth().signOut();
};

const handleLogin = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsUserLoggedIn(!!user);
    });
  }, []);

  return (
    <Container>
      <GridContainer>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item xs={12} container justify='center'>
          {isUserLoggedIn && user && (
            <>
              <pre>{user.displayName}</pre>
              <br />
              <Button variant='contained' onClick={handleLogout}>
                Sair
              </Button>
            </>
          )}

          {!isUserLoggedIn && (
            <GitHubButton onClick={handleLogin}>Entrar com GitHub
            </GitHubButton>
          )}
        </Grid>
      </GridContainer>
    </Container>
  );
};

const Container = styled.div`
padding: 40px;
`;

const GridContainer = styled(Grid).attrs({
  container: true,
  direction: 'row',
  justify: 'center',
  spacing: 10
})``;

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: 20px;
    text-transform: none;
    max-width: 480px;
  }
`;

const Logo = styled(MainLogo)`
  width: 100%;
`;

export default Login;
