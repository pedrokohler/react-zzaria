import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';

import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg';
import { useAuth } from 'hooks';
import { SIZE_PAGE } from 'routes';

const Header = ({ hideMenu, disableLink }) => {
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
      <Toolbar hideMenu={hideMenu}>
        <LogoContainer hideMenu={hideMenu}>
          <LogoLink to={SIZE_PAGE} disableLink={disableLink}>
            <Logo />
          </LogoLink>
        </LogoContainer>
        {!hideMenu && (
          <>
            <Typography align='center'>Hey, {firstName}</Typography>

            <IconButton color='inherit' onClick={handleOpenMenu}>
              <AccountCircle />
            </IconButton>

            <Menu open={!!anchorElement} onClose={handleCloseMenu} anchorEl={anchorElement}>
              <MenuItem onClick={handleLogout}>
                Sair
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>

  );
};

Header.propTypes = {
  hideMenu: PropTypes.bool,
  disableLink: PropTypes.bool
};

const Toolbar = styled(MaterialToolbar)`
  display: ${({ hideMenu }) => hideMenu ? 'flex' : null};
  justify-content: ${({ hideMenu }) => hideMenu ? 'center' : null};
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
`;

const LogoContainer = styled.div`
  flex-grow: ${({ hideMenu }) => hideMenu ? null : '1'};
`;

const LogoLink = styled(Link)`
  display: inline-block;
  pointer-events: ${({ disableLink }) => disableLink ? 'none' : null};
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

export default Header;
