import React from 'react';
import {
  Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';

import Title from 'components/title';
import singularOrPlural from 'utils/singularOrPlural';

const ChoosePizzaFlavour = ({ location }) => {
  const { flavours } = location.state;
  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <Title variant='h4'>
          Escolha até {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}
        </Title>
      </Grid>
    </>
  );
};

ChoosePizzaFlavour.propTypes = {
  location: PropTypes.object.isRequired
};

export default ChoosePizzaFlavour;
