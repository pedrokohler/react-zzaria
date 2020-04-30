import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar as MaterialToolbar,
  Typography
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg';
import { useAuth } from 'hooks';

const Header = () => {
  const { handleLogout, user } = useAuth();
  const [anchorElement, setAnchorElement] = useState(null);
  const firstName = user.firstName;

  const handleOpenMenu = useCallback(e => {
    setAnchorElement(e.target);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Typography align='center'>Hey, {firstName}</Typography>

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

  );
};

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }
  & line{
    stroke: ${({ theme }) => theme.palette.common.white};
  }
`;

const Toolbar = styled(MaterialToolbar)`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
`;

export default Header;
