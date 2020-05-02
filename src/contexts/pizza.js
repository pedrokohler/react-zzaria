import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

const initialState = {
  selectedSize: {},
  selectedFlavours: []
};

function Pizza ({ children, location }) {
  const [pizza, setPizza] = useState({ ...initialState, ...location.state });

  useEffect(() => {
    setPizza((lastPizza) => ({ ...lastPizza, ...location.state }));
  }, [location]);

  return (
    <PizzaContext.Provider value={{
      pizza,
      setPizza
    }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

Pizza.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

export default Pizza;
