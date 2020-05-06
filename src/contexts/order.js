import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isNewOrder, setIsNewOrder] = useState(true);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({});

  const addPizzaToOrder = (pizza) => {
    const newPizza = {
      id: v4(),
      size: pizza.selectedSize,
      flavours: pizza.selectedFlavours,
      quantity: pizza.quantity
    };

    if (isNewOrder) {
      setPizzas([newPizza]);
      return setIsNewOrder(false);
    }
    setPizzas([...pizzas, newPizza]);
  };

  const removePizzaFromOrder = (id) => {
    setPizzas((pizzas) => pizzas.filter(pizza => pizza.id !== id));
  };

  const sendOrder = () => {
    setIsNewOrder(true);
  };

  return (
    <OrderContext.Provider value={{
      order: {
        pizzas,
        phone,
        address
      },
      addPizzaToOrder,
      setPhone,
      setAddress,
      removePizzaFromOrder,
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
