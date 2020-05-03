import { useContext } from 'react';
import { OrderContext } from 'contexts/order';

const useOrder = () => useContext(OrderContext);

export default useOrder;
