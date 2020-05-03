import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

const initialState = {
  selectedSize: {},
  selectedFlavours: [],
  quantity: 1
};

function Pizza ({ children, location }) {
  const [pizza, setPizza] = useState({ ...initialState, ...location.state });

  useEffect(() => {
    setPizza((lastPizza) => ({ ...lastPizza, ...location.state }));
  }, [location]);

  const resetPizza = () => {
    setPizza(initialState);
  };

  return (
    <PizzaContext.Provider value={{
      pizza,
      setPizza,
      resetPizza
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
