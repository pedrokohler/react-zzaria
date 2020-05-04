import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [pizzas, setPizza] = useState([]);
  const [isNewOrder, setIsNewOrder] = useState(true);

  const addPizzaToOrder = (pizza) => {
    const newPizza = {
      size: pizza.selectedSize,
      flavours: pizza.selectedFlavours,
      quantity: pizza.quantity
    };

    if (isNewOrder) {
      setPizza([newPizza]);
      return setIsNewOrder(false);
    }
    setPizza([...pizzas, newPizza]);
  };

  const sendOrder = () => {
    setIsNewOrder(true);
  };

  return (
    <OrderContext.Provider value={{
      order: {
        pizzas
      },
      addPizzaToOrder,
      sendOrder
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
