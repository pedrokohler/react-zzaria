import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField as MaterialTextField
} from '@material-ui/core';

const TextField = ({ sm, xs, autoFocus, ...props }) => (
  <Grid item xs={12} sm={sm}>
    <MaterialTextField
      fullWidth
      variant='outlined'
      inputProps={{ autoFocus }}
      {...props}
    />
  </Grid>
);

TextField.propTypes = {
  autoFocus: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number
};

export default TextField;
