import React from 'react';
import PropTypes from 'prop-types';

const ChoosePizzaFlavour = ({ location }) => (
  <>
    <h1>Escolha o sabor da pizza</h1>
    <div>
      {JSON.stringify(location.state)}
    </div>
  </>
);

ChoosePizzaFlavour.propTypes = {
  location: PropTypes.object.isRequired
};

export default ChoosePizzaFlavour;
