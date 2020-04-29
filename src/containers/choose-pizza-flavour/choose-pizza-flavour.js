import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { HOME_PAGE } from 'routes';
import Title from 'components/title';
import Header from 'components/content-header';
import singularOrPlural from 'utils/singularOrPlural';

const ChoosePizzaFlavour = ({ location }) => {
  if (!location.state) {
    return <Redirect to={HOME_PAGE} />;
  }

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
