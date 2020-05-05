import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
  IconButton,
  List,
  ListItem as MaterialListItem,
  Typography
} from '@material-ui/core';

import { Close } from '@material-ui/icons';

import { useOrder } from 'hooks';
import { singularOrPlural } from 'utils';
import { SIZE_PAGE } from 'routes';

const OrderInfo = ({ showRemoveButton }) => {
  const { order, removePizzaFromOrder } = useOrder();
  const { pizzas } = order;

  if (!pizzas.length) {
    return <Redirect to={SIZE_PAGE} />;
  }

  return (
    <List>
      {pizzas.map((pizza) => {
        const { id, size, flavours: selectedFlavours, quantity } = pizza;
        const { name, slices, flavours } = size;
        return (
          <ListItem key={id}>
            <Typography>
              <b>{quantity}</b> {singularOrPlural(quantity, 'pizza', 'pizzas')}{' '}
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
            {showRemoveButton && (
              <IconButton
                title='Remover'
                color='secondary'
                onClick={() => removePizzaFromOrder(id)}
              >
                <Close />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

OrderInfo.propTypes = {
  showRemoveButton: PropTypes.bool
};

const ListItem = styled(MaterialListItem)`
  display: flex;
  justify-content: space-between;
`;

export default OrderInfo;
