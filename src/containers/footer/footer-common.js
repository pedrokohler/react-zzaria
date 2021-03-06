import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import {
  Button as MaterialButton,
  Grid,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useAuth } from 'hooks';
import { singularOrPlural } from 'utils';
import { SIZE_PAGE } from 'routes';

const FooterCommon = ({ forwardButton, location, history }) => {
  const { user } = useAuth();

  if (!location.state) {
    return <Redirect to={SIZE_PAGE} />;
  }

  const { selectedSize, selectedFlavours } = location.state;
  const { name, slices, flavours } = selectedSize;

  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <Grid container>
      <OrderContainer>
        <Typography><b>{user.firstName} o seu pedido é:</b></Typography>
        <Typography>
          Pizza <b>{name.toUpperCase()}</b> - {' '}
          ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
          {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
        </Typography>
        {selectedFlavours && (
          <Typography>
            {singularOrPlural(selectedFlavours.length, 'No sabor', 'Nos sabores')}{' '}
            <b>{selectedFlavours
              .map(({ name }) => name)
              .join(', ')
              .replace(/, (.[^,]*)$/, ' e $1')}
            </b>
          </Typography>
        )}
      </OrderContainer>
      <ButtonContainer>
        <Button onClick={goBack}>Voltar</Button>
        <Button
          color='primary'
          {...forwardButton}
        />
      </ButtonContainer>
    </Grid>
  );
};

FooterCommon.propTypes = {
  forwardButton: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ButtonContainer = styled(Grid).attrs({
  item: true
})`
  display: flex;
  align-items: center;
`;

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  flex-grow: 1;
`;

const Button = styled(MaterialButton).attrs({
  variant: 'contained'
})`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

export default FooterCommon;
