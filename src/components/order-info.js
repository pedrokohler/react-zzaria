import React from 'react';
import {
  List,
  ListItem,
  Typography
} from '@material-ui/core';

import { useOrder } from 'hooks';
import { singularOrPlural } from 'utils';

const OrderInfo = () => {
  const { order } = useOrder();
  return (
    <List>
      {order.pizzas.map((pizza, i) => {
        const { size, flavours: selectedFlavours, quantity } = pizza;
        const { name, slices, flavours } = size;
        return (
          <ListItem key={i}>
            <Typography>
              <b>{quantity}</b> - {singularOrPlural(quantity, 'pizza', 'pizzas')}{' '}
              <b>{name.toUpperCase()}</b> - {' '}
              ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
              {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
              <br />
              {singularOrPlural(selectedFlavours.length, 'No sabor', 'Nos sabores')}{' '}
              <b>{selectedFlavours
                .map(({ name }) => name)
                .join(', ')
                .replace(/, (.[^,]*)$/, ' e $1')}
              </b>
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default OrderInfo;
