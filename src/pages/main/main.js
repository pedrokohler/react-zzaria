import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar as MaterialToolbar,
  Typography
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg';

import { AuthContext } from 'contexts/auth';

const Main = () => {
  const { handleLogout, user } = useContext(AuthContext);
  const [anchorElement, setAnchorElement] = useState(null);
  const firstName = user.displayName.split(' ')[0];

  const handleOpenMenu = useCallback(e => {
    setAnchorElement(e.target);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <>
      <AppBar>
        <Toolbar>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <Typography>Hey, {firstName}</Typography>

          <IconButton color='inherit' onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>

          <Menu open={!!anchorElement} onClose={handleCloseMenu} anchorEl={anchorElement}>
            <MenuItem onClick={handleLogout}>
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Content>
        <Grid container>
          <Grid item>
            <Typography variant='h3'>
              O que vai ser hoje, {firstName}?
            </Typography>
          </Grid>
        </Grid>
      </Content>
    </>
  );
};

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  & path {
    fill: #fff;
  }
  & line{
    stroke: #fff;
  }
`;

const Toolbar = styled(MaterialToolbar)`
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
`;

const Content = styled.main`
  padding: 100px 20px 20px;
`;

export default Main;
