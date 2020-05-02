import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Card as MaterialCard,
  Grid,
  Typography
} from '@material-ui/core';

import { SIZE_PAGE } from 'routes';
import Title from 'components/title';
import Header from 'components/content-header';
import PizzasGrid from 'components/pizzas-grid';
import Divider from 'components/divider';
import { singularOrPlural, toMoney } from 'utils';
import CardLink from 'components/card-link';

import pizzaFlavours from 'mocks/pizza-flavours';

const ChoosePizzaFlavour = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState({});

  if (!location.state) {
    return <Redirect to={SIZE_PAGE} />;
  }
  const { flavours, id: sizeId } = location.state.size;

  const countChecked = () => Object
    .values(checkboxes)
    .filter(Boolean)
    .length;

  const getCheckedNames = (checkboxes) => Object.entries(checkboxes)
    .filter(([, value]) => !!value)
    .map(([id]) => ({
      id,
      name: pizzaFlavours.find(flavour => flavour.id === id).name
    }));

  const handleChangeCheckbox = (id) => (e) => {
    const newState = e.target.checked;
    const maxFlavours = flavours;
    const currentFlavours = countChecked();

    if (!newState || currentFlavours < maxFlavours) {
      setCheckboxes((checkboxes) => ({
        ...checkboxes,
        [id]: newState
      }));
    }
  };

  return (
    <>
      <Header>
        <Title variant='h4'>
          Escolha até {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}
        </Title>
      </Header>
      <PizzasGrid>
        {pizzaFlavours.map(flavour => (
          <Grid item key={flavour.id} xs>
            <Card checked={!!checkboxes[flavour.id]}>
              <Label>
                <InvisibleCheckbox
                  type='checkbox'
                  checked={!!checkboxes[flavour.id]}
                  onChange={handleChangeCheckbox(flavour.id)}
                />
                <Img src={flavour.image} alt={flavour.name} />
                <Divider />
                <Typography>{flavour.name}</Typography>
                <Typography variant='h5'>{toMoney(flavour.value[sizeId])}
                </Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>
    </>
  );
};

ChoosePizzaFlavour.propTypes = {
  location: PropTypes.object.isRequired
};

const Img = styled.img`
max-width: 200px;
`;

const InvisibleCheckbox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`;

const Card = styled(MaterialCard)`
  border: 2px solid transparent;
  border-color: ${({ theme, checked }) => checked ? theme.palette.primary.light : ''}
`;

const Label = styled(CardLink).attrs({
  component: 'label'
})``;

export default ChoosePizzaFlavour;
