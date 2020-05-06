import React from 'react';
import styled from 'styled-components';
import {
  Snackbar as MaterialSnackbar
} from '@material-ui/core';

const ErrorSnackbar = () => (
  <Snackbar open message='Houve um erro ao carregar os dados' />
);

const Snackbar = styled(MaterialSnackbar)`
  & div {
    margin: auto;
    text-align: center;
  }
`;

export default ErrorSnackbar;
