import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

function Pizza ({ children }) {
  // const location = useLocation();
  const [pizza, setPizza] = useState(null);

  // useEffect(() => {
  //   setPizza(location.state);
  // }, [location]);

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
  children: PropTypes.node.isRequired
};

export default Pizza;
