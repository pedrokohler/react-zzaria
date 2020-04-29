import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid
} from '@material-ui/core';

const ContentHeader = ({ children }) => (
  <Grid container direction='column' alignItems='center'>
    {children}
  </Grid>
);

ContentHeader.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentHeader;
