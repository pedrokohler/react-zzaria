import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import firebase, { db } from 'services/firebase';
import { useAuth } from 'hooks';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isNewOrder, setIsNewOrder] = useState(true);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({});
  const { user } = useAuth();

  const addPizzaToOrder = useCallback((pizza) => {
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
  }, [isNewOrder, pizzas]);

  const removePizzaFromOrder = useCallback((id) => {
    setPizzas((pizzas) => pizzas.filter(pizza => pizza.id !== id));
  }, []);

  const sendOrder = useCallback(async () => {
    try {
      const order = {
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        address,
        phone,
        pizzas: pizzas.map(pizza => ({
          size: pizza.size,
          flavours: pizza.flavours,
          quantity: pizza.quantity
        }))
      };
      await db.collection('orders').add(order);
      setIsNewOrder(true);
    } catch (e) {
      console.log('Erro ao salvar pedido', e.message);
    }
  }, [address, phone, pizzas, user]);

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
