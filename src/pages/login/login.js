import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg';
import { AuthContext } from 'contexts/auth';

const Login = () => {
  const { handleLogin } = useContext(AuthContext);

  return (
    <Container>
      <GridContainer>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={handleLogin}>Entrar com GitHub</GitHubButton>
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
  spacing: 5
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
