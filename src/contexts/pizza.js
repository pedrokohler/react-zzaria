import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

function Pizza ({ children, location }) {
  const [pizza, setPizza] = useState(location.state);

  useEffect(() => {
    setPizza(location.state);
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
