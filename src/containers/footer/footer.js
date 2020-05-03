import React from 'react';
import styled from 'styled-components';
import {
  Container
} from '@material-ui/core';
import PropTypes from 'prop-types';

import FooterCommon from './footer-common';

const Footer = ({ children, ...props }) => {
  return (
    <FooterContainer>
      <Container>
        {children || <FooterCommon {...props} />}
      </Container>
    </FooterContainer>
  );
};

Footer.propTypes = {
  children: PropTypes.node
};

const FooterContainer = styled.footer`
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
  padding: ${({ theme }) => theme.spacing(1)}px;
  width: 100%;
`;

export default Footer;
