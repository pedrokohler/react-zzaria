import { useContext } from 'react';
import { PizzaContext } from 'contexts/pizza';

const usePizza = () => useContext(PizzaContext);

export default usePizza;
