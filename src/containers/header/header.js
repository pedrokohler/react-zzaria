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

  const Toolbar = useCallback(styled(MaterialToolbar)`
    ${hideMenu ? 'display: flex;' : null}
    ${hideMenu ? 'justify-content: center;' : null}
    margin: 0 auto;
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
  `, [hideMenu]);

  const LogoContainer = useCallback(styled.div`
    ${hideMenu ? null : 'flex-grow: 1;'}
  `, [hideMenu]);

  const LogoLink = useCallback(styled(Link)`
    display: inline-block;
    ${disableLink ? 'pointer-events: none;' : null}
  `, [disableLink]);

  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <LogoLink to={SIZE_PAGE}>
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
