import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => (
  <OrderContext.Provider value={{}}>
    {children}
  </OrderContext.Provider>
);

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default OrderProvider;
