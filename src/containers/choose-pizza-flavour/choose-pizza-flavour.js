import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/title';
import Header from 'components/content-header';
import singularOrPlural from 'utils/singularOrPlural';

const ChoosePizzaFlavour = ({ location }) => {
  const { flavours } = location.state;
  return (
    <>
      <Header>
        <Title variant='h4'>
          Escolha até {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}
        </Title>
      </Header>
    </>
  );
};

ChoosePizzaFlavour.propTypes = {
  location: PropTypes.object.isRequired
};

export default ChoosePizzaFlavour;
