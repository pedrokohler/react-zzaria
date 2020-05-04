import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Footer from './footer';

const FooterCheckout = ({ children, justifyContent }) => (
  <Footer>
    <FooterContent justifyContent={justifyContent}>
      {children}
    </FooterContent>
  </Footer>
);

FooterCheckout.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.string
};

const FooterContent = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};
  flex-grow: 1;
`;

export default FooterCheckout;
