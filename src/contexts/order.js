import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addPizzaToOrder = (pizza) => {
    setOrder([...order, {
      size: pizza.selectedSize.id,
      flavours: pizza.selectedFlavours.map(f => f.id),
      quantity: pizza.quantity
    }]);
  };

  return (
    <OrderContext.Provider value={{
      order,
      addPizzaToOrder
    }}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default OrderProvider;
